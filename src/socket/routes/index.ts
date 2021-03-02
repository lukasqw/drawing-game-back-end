import { Server } from 'socket.io'
import route from './socket.routes';

export default (io: Server) => {
  route(io);
}
