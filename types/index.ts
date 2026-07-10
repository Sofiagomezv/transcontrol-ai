export type TravelFormValues = {
  id?: string;
  date: string;
  vehicle: string;
  driver: string;
  client: string;
  origin: string;
  destination: string;
  kilometers: number;
  tripValue: number;
  fuel: number;
  urea: number;
  tolls: number;
  perDiem: number;
  driverPayment: number;
  otherExpenses: number;
  observations: string;
};

export type TravelRecord = TravelFormValues & {
  totalExpenses: number;
  utility: number;
  profitability: number;
  costPerKilometer: number;
};
