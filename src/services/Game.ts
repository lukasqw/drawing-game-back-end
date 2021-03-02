import { io } from '../socket';
import { Socket } from 'socket.io';
import moment from 'moment';

import RoomRepository from '../repositories/RoomRepository';
import gameWords from '../FakeDataBase/gameWord';

const Start = async (socket: Socket, id_room: string) => {
  const roomRepository = new RoomRepository();
  var qty_user = 0
  const socketRoom = io.sockets.adapter.rooms[`room-${id_room}`];
  if(socketRoom)
    qty_user = socketRoom.length;

  const room = await roomRepository.findById(id_room);
  
  if(room && !room.game && qty_user > 1) {
    PreGame(socket, id_room);
  }
}

const PreGame = async (socket: Socket, id_room: string) => {
  const roomRepository = new RoomRepository();
  await roomRepository.updateGameStatus(id_room, true);

  const userSocket = io.sockets.adapter.rooms[`room-${id_room}`];

  const index = Random(userSocket.length);
  const word = gameWords[Random(gameWords.length)];
  await roomRepository.updateGameWord(id_room, word);

  const players = Object.keys(userSocket.sockets);
  const playerDraw = players[index];

  io.to(playerDraw).emit('toDraw', { word });

  const now = moment();
  const interval = 5;
  const endTimer = now.add(interval, 'seconds');

  const timer = setInterval(() => {
    if(moment().isBefore(endTimer)){
      var timerNow = moment();
      var subTimer = endTimer.diff(timerNow, 'seconds');

      var percentTimer = (subTimer * 100) / interval;

      io.to(`room-${id_room}`).emit('timerPreGame', { interval: percentTimer });
    }

    if(moment().isSame(endTimer, 'seconds')) {
      Game(socket, id_room);
      clearInterval(timer);
    }
  }, 1000);
}

const Game = async (socket: Socket, id_room: string) => {
  const roomRepository = new RoomRepository();
  const now = moment();
  const interval = 10;
  const endTimer = now.add(interval, 'seconds');
  
  const room = await roomRepository.findById(id_room);
  var word = '';
  if(room) 
    word = room.game_word; 

  io.to(`room-${id_room}`).emit('startGame', { word: StringUnderscore(word) });

  const timer = setInterval(() => {
    if(moment().isBefore(endTimer)){
      var timerNow = moment();
      var subTimer = endTimer.diff(timerNow, 'seconds');

      var percentTimer = (subTimer * 100) / interval;

      io.to(`room-${id_room}`).emit('timerGame', { interval: percentTimer });
    }

    if(moment().isSame(endTimer, 'seconds')) {
      io.to(`room-${id_room}`).emit('endGame', { word })
      clearInterval(timer);

      const roomRepository = new RoomRepository();
      roomRepository.updateGameStatus(id_room, false);
      Start(socket, id_room);
    }
  }, 900);
}

const Random = (length: number) => {
  return Math.floor(Math.random() * (length - 0) + 0);
}

const StringUnderscore = (str: string) => {
  return str.replace(/[a-zA-Z-0-9]/g, '_');
}

export default Start;
