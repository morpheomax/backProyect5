
const express = require("express");
const { createServer } = require("http");
const { Server } = require("sse");

const app = express();
const httpServer = createServer(app);

// Configura SSE
const sse = new Server(httpServer, {
  path: "/events", // Ruta para las conexiones SSE
});

// Maneja las conexiones SSE
sse.on("connection", (client) => {
  // Envía eventos a los clientes conectados
  setInterval(() => {
    client.send({ message: "Mensaje desde el servidor." });
  }, 1000);
});

httpServer.listen(3000, () => {
  console.log("Servidor SSE en ejecución en el puerto 3000");
});
