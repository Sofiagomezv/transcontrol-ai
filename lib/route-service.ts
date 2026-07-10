import { mockRoutes } from "@/mock/routes";
import type { RouteDefinition } from "@/types/routes";

export function getRouteDefinitions(): RouteDefinition[] {
  return [...mockRoutes];
}
