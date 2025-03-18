import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Detecta se está em produção ou desenvolvimento
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react()],
  base: isProduction ? "/rupauls-drag-race-simulator/" : "/", // Só usa base em produção
});
