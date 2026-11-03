// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

// https://astro.build/config
export default defineConfig({
  site: "http://kirilltest1984online.ru",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [fileURLToPath(new URL("./src", import.meta.url))],
          additionalData: `@use "assets/scss/helpers/index" as *;\n`,
        },
      },
    },
  },
});
