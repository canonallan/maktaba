import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export const initializeSocket = (userId: string) => {
  socket.emit('user:join', userId);
};

export const sendMessage = (receiverId: string, message: any) => {
  socket.emit('message:send', { receiverId, message });
};

export const onMessageReceive = (callback: (message: any) => void) => {
  socket.on('message:receive', callback);
};

export default socket;