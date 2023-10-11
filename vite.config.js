import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      injectRegister: "script",
      manifest: {
        short_name: "CryptoCalcX",
        name: "Crypto Calc X",
        start_url: "/",
        display: "standalone",
        theme_color: "#18181B",
        background_color: "#18181B",
        description:
          "CryptoCalcX is your go-to digital asset calculator, designed to effortlessly convert your fiat currency to its equivalent value in Bitcoin (BTC) and Ethereum (ETH).",
        screenshots: [
          {
            src: "screenshot.png",
            type: "image/png",
            sizes: "1235x2646",
          },
        ],
        icons: [
          {
            src: "logo_crypto.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "maskable_logo.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // opciones de workbox
      },
    }),
  ],
});
