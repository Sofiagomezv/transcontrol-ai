import { mockCustomers } from "@/mock/customers";
import { readStorage, writeStorage } from "@/lib/storage";
import type { Customer, CustomerFormValues } from "@/types/customer";

const STORAGE_KEY = "customers";

function buildId(index: number): string {
  return `CU-${String(index).padStart(4, "0")}`;
}

function getStoredCustomers(): Customer[] {
  const stored = readStorage<Customer[] | null>(STORAGE_KEY, null);
  if (stored) {
    return stored;
  }

  const initial = mockCustomers;
  writeStorage(STORAGE_KEY, initial);
  return initial;
}

export function getCustomerRecords(): Customer[] {
  return getStoredCustomers().map((customer) => ({ ...customer }));
}

export function createCustomerRecord(values: CustomerFormValues): Customer {
  const records = getStoredCustomers();
  const duplicate = records.some((customer) => customer.nit.trim().toLowerCase() === values.nit.trim().toLowerCase());
  if (duplicate) {
    throw new Error("El NIT ya existe en el sistema.");
  }

  const newRecord: Customer = {
    id: buildId(records.length + 1001),
    ...values,
    name: values.name.trim(),
    nit: values.nit.trim(),
    phone: values.phone.trim(),
    email: values.email.trim(),
    city: values.city.trim(),
    address: values.address.trim(),
    status: values.status,
  };

  const next = [newRecord, ...records];
  writeStorage(STORAGE_KEY, next);
  return newRecord;
}

export function updateCustomerRecord(id: string, values: CustomerFormValues): Customer | undefined {
  const records = getStoredCustomers();
  const index = records.findIndex((record) => record.id === id);
  if (index === -1) {
    return undefined;
  }

  const duplicate = records.some((record, recordIndex) => recordIndex !== index && record.nit.trim().toLowerCase() === values.nit.trim().toLowerCase());
  if (duplicate) {
    throw new Error("El NIT ya existe en el sistema.");
  }

  const updated: Customer = {
    id,
    ...values,
    name: values.name.trim(),
    nit: values.nit.trim(),
    phone: values.phone.trim(),
    email: values.email.trim(),
    city: values.city.trim(),
    address: values.address.trim(),
    status: values.status,
  };

  const next = records.map((record) => (record.id === id ? updated : record));
  writeStorage(STORAGE_KEY, next);
  return updated;
}

export function deleteCustomerRecord(id: string): boolean {
  const records = getStoredCustomers();
  const next = records.filter((record) => record.id !== id);
  if (next.length === records.length) {
    return false;
  }

  writeStorage(STORAGE_KEY, next);
  return true;
}
