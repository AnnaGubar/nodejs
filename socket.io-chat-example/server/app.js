const { Server } = require("socket.io");
const { createServer } = require("http");

// создание сервера
const httpServer = createServer();

// создание web-socket сервера
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// отслеживание запуска сервера
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    // генерирует событие
    socket.broadcast.emit("chat message", msg);
  });
});

httpServer.listen(5000);
