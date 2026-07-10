export type { Customer, CustomerFormValues, CustomerStatus } from "@/types/customer";
export type { Driver, DriverFormValues, DriverStatus } from "@/types/driver";
export type { Operation, OperationFormValues, OperationStatus } from "@/types/operation";

export type TravelFormValues = import("@/types/operation").OperationFormValues;
export type TravelRecord = import("@/types/operation").Operation;
