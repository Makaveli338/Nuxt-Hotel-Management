// /plugins/leaflet.client.ts
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

export default defineNuxtPlugin((nuxtApp) => {
  console.log("✅ Leaflet plugin loaded (client-only)");

  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  nuxtApp.provide("L", L);
});
