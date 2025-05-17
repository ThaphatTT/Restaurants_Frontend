// https://nuxt.com/docs/api/configuration/nuxt-config
// import fs from "fs";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_API_BASE_URL || "http://localhost:9000/api",
      googleMapsApiKey: process.env.NUXT_GOOGLE_MAPS_API_KEY,
    },
  },
  css: ["@/assets/css/bootstrap.scss"],
  // vite: {
  //   server: {
  //     https: {
  //       key: fs.readFileSync("./openssl-3.5.0/key.pem"),
  //       cert: fs.readFileSync("./openssl-3.5.0/cert.pem"),
  //     },
  //   },
  // },
});
