import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/diabetes-data-explorer/",
  plugins: [react()],
  test: {
    environment: "node",
  },
});
