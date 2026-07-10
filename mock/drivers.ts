import type { Driver } from "@/types/driver";

export const mockDrivers: Driver[] = [
  {
    id: "DR-1001",
    fullName: "Sofía Pérez",
    document: "1012345678",
    phone: "3001234567",
    licenseNumber: "CC-1023",
    licenseCategory: "C2",
    expirationDate: "2027-08-15",
    status: "disponible",
  },
  {
    id: "DR-1002",
    fullName: "Mateo Ruiz",
    document: "1098765432",
    phone: "3017654321",
    licenseNumber: "CC-2045",
    licenseCategory: "C3",
    expirationDate: "2028-01-20",
    status: "en operación",
  },
];
