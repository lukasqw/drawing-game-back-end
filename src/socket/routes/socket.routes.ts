import { Server } from 'socket.io'
import RoomRepository from '../../repositories/RoomRepository';
import LineRepository from '../../repositories/LineRepository';
import MessageRepository from '../../repositories/MessageRepository';

import startGame from '../../services/Game';

export default async (io: Server): Promise<void> => {
  const roomRepository = new RoomRepository();
  const lineRepository = new LineRepository();
  const messageRepository = new MessageRepository();
  var indexRoom: number = -1;

  io.on('connection', (socket) => {
    console.log(`[SOCKET] /connection - ${socket.id}`);

    socket.emit('connectionSuccess');

    socket.on('disconnect', (reason) => {
        socket.disconnect();
    });

    socket.on('enterToRoom', async (id_room: string) => {
      const findRoom = await roomRepository.findById(id_room);
      indexRoom = await roomRepository.findIndexById(id_room);

      if(findRoom && findRoom.qty_user < findRoom.max_users){
        socket.join(`room-${findRoom.id}`);

        // startGame(socket, findRoom.id);

        socket.emit('enterToRoomSuccess');
      } else {
        socket.emit('enterToRoomError');
      }
    });

    socket.on('draw', async (lineData) => {
      const line = await lineRepository.create(indexRoom, lineData);

      if(line){
        io.to(`room-${line.id_room}`).emit('draw', line);
      }
    });

    socket.on('clearDrawArea', async (id_room: string) => {
      try {
        await lineRepository.deleteAll(indexRoom);
        io.to(`room-${id_room}`).emit('clearDrawArea');
      } catch (error) {}
    });

    socket.on('sendMessage', async (messageData) => {
      const message = await messageRepository.create(indexRoom, messageData);

      if(message){
        io.to(`room-${message.id_room}`).emit('sendMessage', messageData);
      }
    });

  });
};
