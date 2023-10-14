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
        id: "/",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#18181B",
        background_color: "#18181B",
        description:
          "CryptoCalcX is your go-to digital asset calculator, designed to effortlessly convert your fiat currency to its equivalent value in Bitcoin (BTC) and Ethereum (ETH).",
        screenshots: [
          {
            src: "screenshot_mobile_1.png",
            type: "image/png",
            sizes: "1080x2220",
          },
          {
            src: "screenshot_mobile_2.png",
            type: "image/png",
            sizes: "1080x2220",
          }
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
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/api\.coingecko\.com\/api\/v3\/simple\/price\?ids=bitcoin,ethereum&vs_currencies=usd,ars$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "crypto-rate-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, 
              },
              networkTimeoutSeconds: 10, 
            },
          },
        ],
      },
    }),
  ],
});
