import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      { find: "@components", replacement: path.resolve(__dirname, "src/components") },
      { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@interfaces", replacement: path.resolve(__dirname, "src/interfaces") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@routes", replacement: path.resolve(__dirname, "src/routes") },
      { find: "@stores", replacement: path.resolve(__dirname, "src/stores") },
      { find: "@ui-toolkit", replacement: path.resolve(__dirname, "src/components/ui-toolkit") },
    ],
  },
});
