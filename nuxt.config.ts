// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  srcDir: "app/",
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

   // @ts-ignore
  server: {
    host: "0.0.0.0", // bind to all interfaces so Render can detect the port
    port: Number(process.env.PORT) || 3000, // use the port Render provides
  },

   nitro: {
    preset: "node-server", // ensures Nuxt runs as a server for SSR
  },
});
