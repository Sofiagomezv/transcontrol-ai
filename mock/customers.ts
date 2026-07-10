import type { Customer } from "@/types/customer";

export const mockCustomers: Customer[] = [
  {
    id: "CU-1001",
    name: "Grupo Norte",
    nit: "900123456-1",
    phone: "6012345678",
    email: "ventas@norte.com",
    city: "Bogotá",
    address: "Cra 10 # 20-30",
    status: "activo",
  },
  {
    id: "CU-1002",
    name: "Logística del Sol",
    nit: "800987654-2",
    phone: "6045678901",
    email: "operaciones@sol.com",
    city: "Medellín",
    address: "Av 57 # 45-67",
    status: "activo",
  },
];
