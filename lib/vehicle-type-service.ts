import { mockVehicleTypes } from "@/mock/vehicle-types";
import type { VehicleTypeDefinition } from "@/types/vehicle-types";

export function getVehicleTypeDefinitions(): VehicleTypeDefinition[] {
  return [...mockVehicleTypes];
}
