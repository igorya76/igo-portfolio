import { fastify, FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import Sensible from "@fastify/sensible";
import UnderPressure from "@fastify/under-pressure";
import ScannerRoute from "./scanner";

export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(Sensible);
  await fastify.register(UnderPressure, {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 1000000000,
    maxRssBytes: 1000000000,
    maxEventLoopUtilization: 0.98,
  });

  await fastify.register(ScannerRoute, {
    prefix: "/api/scanner",
  });
});
