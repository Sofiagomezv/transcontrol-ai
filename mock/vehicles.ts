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
    status: "En viaje",
  },
  {
    id: "VH-1003",
    plate: "QW-77",
    brand: "Scania",
    model: "S500",
    year: 2023,
    type: "Volquete",
    capacity: "25 Ton",
    status: "Mantenimiento",
  },
  {
    id: "VH-1004",
    plate: "LM-33",
    brand: "Renault",
    model: "D Wide",
    year: 2020,
    type: "Vehículo ligero",
    capacity: "3 Ton",
    status: "Disponible",
  },
];
