import { connect } from "http2";
import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useBoolean } from "../../hooks";
function getUrl() {
  let httpProtocol = window.location.protocol;
  let host = window.location.host;
  let socketProtocol = httpProtocol === "http:" ? "ws:" : "wss";
  return `${socketProtocol}//${host}/api/barcode/ws`;
}
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
function parseMessage(msg: string): tMessage {
  return JSON.parse(msg);
}
type tMode = "web" | "mobile";
export function useWebSocketHook(p: {
  code: string;
  mode: tMode;
  watchScans?: (code: string) => void;
}) {
  const [connectedClients, setConnectedClients] = useState<
    { client_id: string; mode: tMode }[]
  >([]);
  //Public API that will echo messages sent to it back to the client
  const [messageHistory, setMessageHistory] = useState<
    MessageEvent<tMessage>[]
  >([]);

  const socket = useWebSocket(`${getUrl()}?code=${p.code}`, {
    queryParams: {
      id: p.code,
    },
  });
  const { readyState, lastMessage } = socket;

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    let message = parseMessage(lastMessage?.data || "{}");

    console.log({ lastMessage, messageHistory });
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
    if (message.type === "connected") {
      let isConnected = connectedClients.find(
        (c) => c.client_id === message.client_id
      );
      if (isConnected) return;
      setConnectedClients([
        {
          client_id: message.client_id,
          mode: message.mode,
        },
        ...connectedClients,
      ]);
    }
    if (message.type === "disconnected") {
      let remainingClients = connectedClients.filter(
        (c) => c.client_id != message.client_id
      );
      setConnectedClients((c) => {
        return c.filter((c) => c.client_id != message.client_id);
      });
    }
    if (message.type === "scan" && p.watchScans) {
      p.watchScans(message.code);
    }
  }, [lastMessage]);

  function sendMessage(json: tMessage) {
    socket.sendMessage(JSON.stringify(json));
  }

  useEffect(() => {
    if (connectionStatus === "Open") {
      sendMessage({
        type: "connected",
        client_id: "server_defined",
        mode: p.mode,
      });
      console.log("send message");
    }
  }, [connectionStatus, p.code]);

  return {
    messageHistory,
    connectionStatus,
    hasClient(type: tMode) {
      let match = connectedClients.find((c) => c.mode === type);
      return Boolean(match);
    },
    sendScan(codeType: string) {
      return sendMessage({
        type: "scan",
        code: codeType,
      });
    },
  };
}
