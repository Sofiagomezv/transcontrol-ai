export type DriverStatus = "disponible" | "en operación" | "inactivo";

export type Driver = {
  id: string;
  fullName: string;
  document: string;
  phone: string;
  licenseNumber: string;
  licenseCategory: string;
  expirationDate: string;
  status: DriverStatus;
};

export type DriverFormValues = Omit<Driver, "id">;
