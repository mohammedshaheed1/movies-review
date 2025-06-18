// src/socket.js
import { io } from "socket.io-client";

/**
 * Lazily‑created, shared Socket.IO client.
 * Always call getSocket(userId) instead of io() directly.
 */
let socket;

export const getSocket = (userId) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000", {
      autoConnect: false,
      transports: ["websocket"],   // keep it simple
      query: { userId },           // passed to handshake
    });
  }
  return socket;
};
