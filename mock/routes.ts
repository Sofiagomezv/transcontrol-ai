import type { RouteDefinition } from "@/types/routes";

export const mockRoutes: RouteDefinition[] = [
  { id: "RT-001", name: "Bogotá - Medellín", origin: "Bogotá", destination: "Medellín", distanceKm: 418, estimatedHours: 8 },
  { id: "RT-002", name: "Cali - Bucaramanga", origin: "Cali", destination: "Bucaramanga", distanceKm: 590, estimatedHours: 10 },
  { id: "RT-003", name: "Barranquilla - Cartagena", origin: "Barranquilla", destination: "Cartagena", distanceKm: 120, estimatedHours: 2 },
];
