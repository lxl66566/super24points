import { defineConfig, type UserConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [UnoCSS(), solidPlugin()],
  base: "/super24points/",
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  optimizeDeps: {
    include: ["solid-markdown > micromark", "solid-markdown > unified"],
  },
}) satisfies UserConfig as UserConfig;
