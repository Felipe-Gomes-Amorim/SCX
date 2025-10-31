import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react/jsx-runtime": "react/jsx-runtime",
      
    },
  },
  server: {
    allowedHosts: ['scx-sistema-de-controle-de-exames.onrender.com'],
    host: "0.0.0.0", 
    port: 5173,
  }

  
});