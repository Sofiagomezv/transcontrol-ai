import { mockOperationStatuses } from "@/mock/operation-statuses";
import type { OperationStatusDefinition } from "@/types/operation-statuses";

export function getOperationStatusDefinitions(): OperationStatusDefinition[] {
  return [...mockOperationStatuses];
}
