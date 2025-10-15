import type * as L from "leaflet";

declare module "#app" {
  interface NuxtApp {
    $L: typeof L;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $L: typeof L;
  }
}

export {};
