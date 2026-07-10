export type CustomerStatus = "activo" | "inactivo";

export type Customer = {
  id: string;
  name: string;
  nit: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  status: CustomerStatus;
};

export type CustomerFormValues = Omit<Customer, "id">;
