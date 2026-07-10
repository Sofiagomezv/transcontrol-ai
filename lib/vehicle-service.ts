import { mockVehicles } from "@/mock/vehicles";
import type { Vehicle, VehicleFormValues } from "@/types/vehicle";

const vehicleStore: Vehicle[] = [...mockVehicles];

export function getVehicleRecords(): Vehicle[] {
  return [...vehicleStore];
}

export function getVehicleRecordById(id: string): Vehicle | undefined {
  return vehicleStore.find((vehicle) => vehicle.id === id);
}

export function createVehicleRecord(values: VehicleFormValues): Vehicle {
  const newVehicle: Vehicle = {
    id: `VH-${String(vehicleStore.length + 1001).padStart(4, "0")}`,
    ...values,
  };

  vehicleStore.unshift(newVehicle);
  return newVehicle;
}

export function updateVehicleRecord(id: string, values: VehicleFormValues): Vehicle | undefined {
  const index = vehicleStore.findIndex((vehicle) => vehicle.id === id);

  if (index === -1) {
    return undefined;
  }

  const updated = { ...vehicleStore[index], ...values, id };
  vehicleStore[index] = updated;
  return updated;
}

export function deleteVehicleRecord(id: string): boolean {
  const index = vehicleStore.findIndex((vehicle) => vehicle.id === id);

  if (index === -1) {
    return false;
  }

  vehicleStore.splice(index, 1);
  return true;
}
