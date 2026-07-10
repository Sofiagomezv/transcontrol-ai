export type OperationStatus = "borrador" | "programada" | "en ruta" | "entregada" | "cerrada";

export type Operation = {
  id: string;
  date: string;
  client: string;
  vehicle: string;
  driver: string;
  origin: string;
  destination: string;
  kilometers: number;
  freightValue: number;
  fuel: number;
  urea: number;
  tolls: number;
  perDiem: number;
  driverPayment: number;
  otherExpenses: number;
  observations: string;
  status: OperationStatus;
  totalExpenses: number;
  utility: number;
  profitability: number;
  costPerKilometer: number;
};

export type OperationFormValues = Omit<Operation, "id" | "totalExpenses" | "utility" | "profitability" | "costPerKilometer">;
