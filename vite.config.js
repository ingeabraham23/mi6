import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";

const base = "/mi6/";
// https://vite.dev/config/
export default defineConfig({
  base,

  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],

  server: {
    host: true,
  },
});
