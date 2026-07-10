import { mockOperations } from "@/mock/operations";
import { readStorage, writeStorage } from "@/lib/storage";
import type { Operation, OperationFormValues } from "@/types/operation";

const STORAGE_KEY = "operations";

function buildId(index: number): string {
  return `OP-${String(index).padStart(4, "0")}`;
}

function getStoredOperations(): Operation[] {
  const stored = readStorage<Operation[] | null>(STORAGE_KEY, null);
  if (stored) {
    return stored;
  }

  const initial = mockOperations;
  writeStorage(STORAGE_KEY, initial);
  return initial;
}

export function getOperationRecords(): Operation[] {
  return getStoredOperations().map((operation) => ({ ...operation }));
}

export function createOperationRecord(values: OperationFormValues): Operation {
  const records = getStoredOperations();
  const newRecord: Operation = {
    id: buildId(records.length + 1001),
    ...values,
    totalExpenses: calculateTotalExpenses(values),
    utility: calculateUtility(values),
    profitability: calculateProfitability(values),
    costPerKilometer: calculateCostPerKilometer(values),
  };

  const next = [newRecord, ...records];
  writeStorage(STORAGE_KEY, next);
  return newRecord;
}

export function updateOperationRecord(id: string, values: OperationFormValues): Operation | undefined {
  const records = getStoredOperations();
  const index = records.findIndex((record) => record.id === id);
  if (index === -1) {
    return undefined;
  }

  const updated: Operation = {
    ...records[index],
    ...values,
    totalExpenses: calculateTotalExpenses(values),
    utility: calculateUtility(values),
    profitability: calculateProfitability(values),
    costPerKilometer: calculateCostPerKilometer(values),
  };

  const next = records.map((record) => (record.id === id ? updated : record));
  writeStorage(STORAGE_KEY, next);
  return updated;
}

export function deleteOperationRecord(id: string): boolean {
  const records = getStoredOperations();
  const next = records.filter((record) => record.id !== id);
  if (next.length === records.length) {
    return false;
  }

  writeStorage(STORAGE_KEY, next);
  return true;
}

export function calculateOperationMetrics(values: OperationFormValues) {
  return {
    totalExpenses: calculateTotalExpenses(values),
    utility: calculateUtility(values),
    profitability: calculateProfitability(values),
    costPerKilometer: calculateCostPerKilometer(values),
  };
}

export function formatCurrency(value: number) {
  return `$${value.toLocaleString("es-CO")}`;
}

function calculateTotalExpenses(values: OperationFormValues) {
  return values.fuel + values.urea + values.tolls + values.perDiem + values.driverPayment + values.otherExpenses;
}

function calculateUtility(values: OperationFormValues) {
  return values.freightValue - calculateTotalExpenses(values);
}

function calculateProfitability(values: OperationFormValues) {
  if (values.freightValue === 0) {
    return 0;
  }
  return ((values.freightValue - calculateTotalExpenses(values)) / values.freightValue) * 100;
}

function calculateCostPerKilometer(values: OperationFormValues) {
  if (values.kilometers === 0) {
    return 0;
  }
  return calculateTotalExpenses(values) / values.kilometers;
}
