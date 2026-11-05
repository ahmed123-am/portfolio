import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative asset paths work for both a custom domain and a GitHub project page.
  base: "./",
  plugins: [react()],
});
