import type { Vehicle } from "@/types/vehicle";

export const mockVehicles: Vehicle[] = [
  {
    id: "VH-1001",
    plate: "AX-204",
    brand: "Volvo",
    model: "FH16",
    year: 2022,
    type: "Camión",
    capacity: "20 Ton",
    currentMileage: 124500,
    status: "Disponible",
  },
  {
    id: "VH-1002",
    plate: "RT-118",
    brand: "Mercedes-Benz",
    model: "Actros",
    year: 2021,
    type: "Camión",
    capacity: "18 Ton",
    currentMileage: 198200,
    status: "En operación",
  },
];
