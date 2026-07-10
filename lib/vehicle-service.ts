import { mockVehicles } from "@/mock/vehicles";
import { readStorage, writeStorage } from "@/lib/storage";
import type { Vehicle, VehicleFormValues } from "@/types/vehicle";

const STORAGE_KEY = "vehicles";

function buildId(index: number): string {
  return `VH-${String(index).padStart(4, "0")}`;
}

function getStoredVehicles(): Vehicle[] {
  const stored = readStorage<Vehicle[] | null>(STORAGE_KEY, null);
  if (stored) {
    return stored;
  }

  const initial = mockVehicles;
  writeStorage(STORAGE_KEY, initial);
  return initial;
}

export function getVehicleRecords(): Vehicle[] {
  return getStoredVehicles().map((vehicle) => ({ ...vehicle }));
}

export function createVehicleRecord(values: VehicleFormValues): Vehicle {
  const records = getStoredVehicles();
  const duplicate = records.some((vehicle) => vehicle.plate.trim().toLowerCase() === values.plate.trim().toLowerCase());
  if (duplicate) {
    throw new Error("La placa ya existe en el sistema.");
  }

  const newVehicle: Vehicle = {
    id: buildId(records.length + 1001),
    ...values,
    plate: values.plate.trim().toUpperCase(),
    brand: values.brand.trim(),
    model: values.model.trim(),
    capacity: values.capacity.trim(),
    currentMileage: Number(values.currentMileage),
  };

  const next = [newVehicle, ...records];
  writeStorage(STORAGE_KEY, next);
  return newVehicle;
}

export function updateVehicleRecord(id: string, values: VehicleFormValues): Vehicle | undefined {
  const records = getStoredVehicles();
  const index = records.findIndex((vehicle) => vehicle.id === id);
  if (index === -1) {
    return undefined;
  }

  const duplicate = records.some((vehicle, vehicleIndex) => vehicleIndex !== index && vehicle.plate.trim().toLowerCase() === values.plate.trim().toLowerCase());
  if (duplicate) {
    throw new Error("La placa ya existe en el sistema.");
  }

  const updated: Vehicle = {
    ...records[index],
    ...values,
    id,
    plate: values.plate.trim().toUpperCase(),
    brand: values.brand.trim(),
    model: values.model.trim(),
    capacity: values.capacity.trim(),
    currentMileage: Number(values.currentMileage),
  };

  const next = records.map((vehicle) => (vehicle.id === id ? updated : vehicle));
  writeStorage(STORAGE_KEY, next);
  return updated;
}

export function deleteVehicleRecord(id: string): boolean {
  const records = getStoredVehicles();
  const next = records.filter((vehicle) => vehicle.id !== id);
  if (next.length === records.length) {
    return false;
  }

  writeStorage(STORAGE_KEY, next);
  return true;
}
