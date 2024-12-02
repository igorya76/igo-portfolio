import Fastify, { FastifyInstance } from "fastify";
import path from "path";
import dotenv from "dotenv";
//mod api server

dotenv.config();
const fastify = Fastify({
  connectionTimeout: 1000 * 60,
  logger: {
    enabled: true,
    level: "silent",
  },
  ajv: {
    customOptions: {
      allowUnionTypes: true,
    },
  },
});

import RoutesCore from "./routes";
await fastify.register(RoutesCore);

import fasttifyStatic from "@fastify/static";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
fastify.register(async (fast: FastifyInstance) => {
  fast.get("/", (req, reply) => {
    return reply.sendFile("index.html", path.join(__dirname));
  });
});

//*Serve Build Assets From Production
fastify.register(fasttifyStatic, {
  prefix: "/app",
  root: path.join(__dirname, "..", "build-react"),
  dotfiles: "allow",
});

fastify.register(fasttifyStatic, {
  prefix: "/assets",
  root: path.join(__dirname, "..", "build-react/app/assets"),
  dotfiles: "allow",
  decorateReply: false,
});

// Serve index.html for all non-file routes, enabling client-side routing
fastify.setNotFoundHandler((request, reply) => {
  // directoryProcessRecursive("./build-react", async (file) => {
  // });
  // Only redirect for GET requests and when no file extension is found
  console.log(request.url);
  let urlRoot = request.url.split("/")[1];
  if (
    request.method === "GET" &&
    ["app", "tablet", "phone", "public"].includes(urlRoot)
  ) {
    reply.sendFile(
      "index.html",
      path.join(__dirname, "..", "build-react", "app")
    );
  } else {
    reply.code(404).send({ error: "Not Found" });
  }
});

//*Run The Server
//*NOTE -> PORT IS ONLY DEFINED IN PRODUCTION
const host = process.env.PORT ? "0.0.0.0" : undefined;
const port = process.env.PORT || (process.env.VITE_LOCALHOST_SERVER as string);
try {
  fastify.ready((err) => {
    if (err) throw err;
  });
  fastify.listen({ port: Number(port), host }, async function (err, address) {
    console.info(`Server Running on port: ${port}, ${address}`);
    if (err) {
      console.error({ err });
      // fastify.log.error(err);
      process.exit(1);
    }
    // Close the server when the terminal is closed
    process.on("SIGINT", async () => {
      try {
        await fastify.close();
        process.exit(0);
      } catch (err) {
        process.exit(1);
      }
    });
  });
} catch (err) {
  console.error({ err });
}
