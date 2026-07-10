import { mockTravels } from "@/mock/travels";
import type { TravelFormValues, TravelRecord } from "@/types";

const travelStore: TravelRecord[] = [...mockTravels];

const formatCurrency = (value: number) => `$${value.toLocaleString("es-CO")}`;

export function getTravelRecords(): TravelRecord[] {
  return [...travelStore];
}

export function getTravelRecordById(id: string): TravelRecord | undefined {
  return travelStore.find((travel) => travel.id === id);
}

export function createTravelRecord(values: TravelFormValues): TravelRecord {
  const newRecord: TravelRecord = {
    ...values,
    id: values.id ?? `TR-${String(travelStore.length + 1003).padStart(4, "0")}`,
    totalExpenses: calculateTotalExpenses(values),
    utility: calculateUtility(values),
    profitability: calculateProfitability(values),
    costPerKilometer: calculateCostPerKilometer(values),
  };

  travelStore.unshift(newRecord);
  return newRecord;
}

export function updateTravelRecord(id: string, values: TravelFormValues): TravelRecord | undefined {
  const index = travelStore.findIndex((travel) => travel.id === id);

  if (index === -1) {
    return undefined;
  }

  const updated: TravelRecord = {
    ...travelStore[index],
    ...values,
    id,
    totalExpenses: calculateTotalExpenses(values),
    utility: calculateUtility(values),
    profitability: calculateProfitability(values),
    costPerKilometer: calculateCostPerKilometer(values),
  };

  travelStore[index] = updated;
  return updated;
}

export function deleteTravelRecord(id: string): boolean {
  const index = travelStore.findIndex((travel) => travel.id === id);

  if (index === -1) {
    return false;
  }

  travelStore.splice(index, 1);
  return true;
}

export function calculateTravelMetrics(values: TravelFormValues) {
  return {
    totalExpenses: calculateTotalExpenses(values),
    utility: calculateUtility(values),
    profitability: calculateProfitability(values),
    costPerKilometer: calculateCostPerKilometer(values),
  };
}

export function formatTravelCurrency(value: number) {
  return formatCurrency(value);
}

function calculateTotalExpenses(values: TravelFormValues) {
  return (
    values.fuel +
    values.urea +
    values.tolls +
    values.perDiem +
    values.driverPayment +
    values.otherExpenses
  );
}

function calculateUtility(values: TravelFormValues) {
  return values.tripValue - calculateTotalExpenses(values);
}

function calculateProfitability(values: TravelFormValues) {
  const totalExpenses = calculateTotalExpenses(values);
  if (values.tripValue === 0) {
    return 0;
  }
  return ((values.tripValue - totalExpenses) / values.tripValue) * 100;
}

function calculateCostPerKilometer(values: TravelFormValues) {
  if (values.kilometers === 0) {
    return 0;
  }
  return calculateTotalExpenses(values) / values.kilometers;
}
