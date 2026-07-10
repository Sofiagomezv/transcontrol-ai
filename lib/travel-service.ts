import {
  calculateOperationMetrics,
  createOperationRecord,
  deleteOperationRecord,
  formatCurrency,
  getOperationRecords,
  updateOperationRecord,
} from "@/lib/operation-service";
import type { TravelFormValues, TravelRecord } from "@/types";

export function getTravelRecords(): TravelRecord[] {
  return getOperationRecords() as TravelRecord[];
}

export function getTravelRecordById(id: string): TravelRecord | undefined {
  return getTravelRecords().find((travel) => travel.id === id);
}

export function createTravelRecord(values: TravelFormValues): TravelRecord {
  return createOperationRecord(values) as TravelRecord;
}

export function updateTravelRecord(id: string, values: TravelFormValues): TravelRecord | undefined {
  return updateOperationRecord(id, values) as TravelRecord | undefined;
}

export function deleteTravelRecord(id: string): boolean {
  return deleteOperationRecord(id);
}

export function calculateTravelMetrics(values: TravelFormValues) {
  return calculateOperationMetrics(values);
}

export function formatTravelCurrency(value: number) {
  return formatCurrency(value);
}
