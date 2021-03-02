import { Server } from 'socket.io';
import socketIo from 'socket.io';
import  http from 'http';

export var io: Server;

export const SocketInit = (server: http.Server): Server => {
  return io = socketIo.listen(server);
};
