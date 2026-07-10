export type VehicleStatus = "Disponible" | "En viaje" | "Mantenimiento" | "Inactivo";

export type VehicleType = "Camión" | "Bus" | "Vehículo ligero" | "Volquete";

export type Vehicle = {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  type: VehicleType;
  capacity: string;
  status: VehicleStatus;
};

export type VehicleFormValues = Omit<Vehicle, "id">;
