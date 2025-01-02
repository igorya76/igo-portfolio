import { fastify, FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import Sensible from "@fastify/sensible";
import UnderPressure from "@fastify/under-pressure";
import { v4 as uuid } from "uuid";
const clients = new Map<string, { code: string; connection: WebSocket }>();
type tMessage =
  | {
      type: "connected";
      client_id: string;
      mode: "web" | "mobile";
    }
  | {
      type: "disconnected";
      client_id: string;
    }
  | {
      type: "scan";
      code: string;
    };

export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(
    async function (fastify) {
      fastify.get("", { websocket: true }, (socket, req) => {
        const client_id = uuid();
        //@ts-ignore
        const code = req.query?.code;
        console.log({ client_id, code });
        if (!code) {
          console.log("close");
          socket.close();
          throw new Error("Code is Required");
        }
        clients.set(client_id, {
          connection: socket as any,
          code: code,
        });
        socket.on("message", (msgRaw) => {
          let message = parseMessage(msgRaw.toString());
          console.log({ message });

          if (message.type === "connected") {
            ///Broadcast to Other Connected Devices
            broadcast(code, {
              type: "connected",
              client_id,
              mode: message.mode,
            });
          }
          if (message.type === "scan") {
            ///Broadcast to Other Connected Devices
            broadcast(code, message);
          }

          // socket.send("hi");
        });
        socket.on("close", () => {
          console.log("close");
          broadcast(code, {
            type: "disconnected",
            client_id,
          });
        });
      });
    },
    {
      prefix: "*",
    }
  );

  function broadcast(code: string, message: tMessage) {
    clients.forEach((v) => {
      console.log(code, v.code);
      if (v.code != code) return;
      let json = JSON.stringify(message);
      console.log("send", json);
      v.connection.send(json);
    });
  }
});

function parseMessage(msg: string): tMessage {
  return JSON.parse(msg);
}
