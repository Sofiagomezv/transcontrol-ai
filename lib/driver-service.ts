import { mockDrivers } from "@/mock/drivers";
import { readStorage, writeStorage } from "@/lib/storage";
import type { Driver, DriverFormValues } from "@/types/driver";

const STORAGE_KEY = "drivers";

function buildId(index: number): string {
  return `DR-${String(index).padStart(4, "0")}`;
}

function getStoredDrivers(): Driver[] {
  const stored = readStorage<Driver[] | null>(STORAGE_KEY, null);
  if (stored) {
    return stored;
  }

  const initial = mockDrivers;
  writeStorage(STORAGE_KEY, initial);
  return initial;
}

export function getDriverRecords(): Driver[] {
  return getStoredDrivers().map((driver) => ({ ...driver }));
}

export function createDriverRecord(values: DriverFormValues): Driver {
  const records = getStoredDrivers();
  const duplicate = records.some((driver) => driver.document.toLowerCase() === values.document.trim().toLowerCase());
  if (duplicate) {
    throw new Error("La cédula ya existe en el sistema.");
  }

  const newRecord: Driver = {
    id: buildId(records.length + 1001),
    ...values,
    document: values.document.trim(),
    fullName: values.fullName.trim(),
    phone: values.phone.trim(),
    licenseNumber: values.licenseNumber.trim(),
    licenseCategory: values.licenseCategory.trim(),
    expirationDate: values.expirationDate,
    status: values.status,
  };

  const next = [newRecord, ...records];
  writeStorage(STORAGE_KEY, next);
  return newRecord;
}

export function updateDriverRecord(id: string, values: DriverFormValues): Driver | undefined {
  const records = getStoredDrivers();
  const index = records.findIndex((record) => record.id === id);
  if (index === -1) {
    return undefined;
  }

  const duplicate = records.some((record, recordIndex) => recordIndex !== index && record.document.toLowerCase() === values.document.trim().toLowerCase());
  if (duplicate) {
    throw new Error("La cédula ya existe en el sistema.");
  }

  const updated: Driver = {
    id,
    ...values,
    document: values.document.trim(),
    fullName: values.fullName.trim(),
    phone: values.phone.trim(),
    licenseNumber: values.licenseNumber.trim(),
    licenseCategory: values.licenseCategory.trim(),
    expirationDate: values.expirationDate,
    status: values.status,
  };

  const next = records.map((record) => (record.id === id ? updated : record));
  writeStorage(STORAGE_KEY, next);
  return updated;
}

export function deleteDriverRecord(id: string): boolean {
  const records = getStoredDrivers();
  const next = records.filter((record) => record.id !== id);
  if (next.length === records.length) {
    return false;
  }

  writeStorage(STORAGE_KEY, next);
  return true;
}
