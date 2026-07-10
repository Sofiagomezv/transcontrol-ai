export type VehicleStatus = "Disponible" | "En operación" | "Mantenimiento" | "Inactivo";

export type VehicleType = "Camión" | "Bus" | "Vehículo ligero" | "Volquete";

export type Vehicle = {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  type: VehicleType;
  capacity: string;
  currentMileage: number;
  status: VehicleStatus;
};

export type VehicleFormValues = Omit<Vehicle, "id">;
