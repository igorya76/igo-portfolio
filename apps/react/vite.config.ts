import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { cwd } from "process";
const selfDestroying = process.env.SW_DESTROY === "true";

let s: string[] = [];
// https://vitejs.dev/config/
export default (props: any) => {
  console.log("cwc", cwd());
  const env: any = loadEnv(props.mode, "../", "VITE_ ");
  let config = defineConfig({
    base: "./src/",
    plugins: [react()],
    resolve: {
      alias: {
        src: fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      sourcemap: process.env.SOURCE_MAP === "true",
      rollupOptions: {
        output: {
          dir: "../server/build-react/app",
          //*Express Public Route, has caching on these
          assetFileNames: "assets/[name].hash-[hash][extname]",
          entryFileNames: "assets/js/[name].hash-[hash].js",
          chunkFileNames: "assets/chunks/[name].hash-[hash].js",
        },
      },
    },
    preview: {},
    appType: "spa",
    server: {
      port: 3001,
      open: false,
      hmr: {
        clientPort: 3001,
      },
      proxy: {
        "/api": {
          target: `http://localhost:${3000}`,
        },
      },
    },
  });
  return config;
};
