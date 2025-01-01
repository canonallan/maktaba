export const setupSocketHandlers = (io) => {
  const users = new Map();

  io.on('connection', (socket) => {
    socket.on('user:join', (userId) => {
      users.set(userId, socket.id);
    });

    socket.on('message:send', ({ receiverId, message }) => {
      const receiverSocketId = users.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('message:receive', message);
      }
    });

    socket.on('disconnect', () => {
      for (const [userId, socketId] of users.entries()) {
        if (socketId === socket.id) {
          users.delete(userId);
          break;
        }
      }
    });
  });
};