import { mockExpenseTypes } from "@/mock/expense-types";
import type { ExpenseTypeDefinition } from "@/types/expense-types";

export function getExpenseTypeDefinitions(): ExpenseTypeDefinition[] {
  return [...mockExpenseTypes];
}
