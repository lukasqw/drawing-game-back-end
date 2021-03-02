import { uuid } from 'uuidv4';

import Room from '../models/Room';
import IRoomRepository from '../repositories/IRoomRepository';
import ICreateRoomDTO from '../dtos/ICreateRoomDTO';

import { io } from '../socket'

import fakeDataBase from '../FakeDataBase';

class RoomRepository implements IRoomRepository {

  public async get(): Promise<Room[]> {
    const rooms = fakeDataBase.rooms

    rooms.forEach(room => {
      const socketRoom = io.sockets.adapter.rooms[`room-${room.id}`];
      if(socketRoom)
        room.qty_user = socketRoom.length;
    });

    return rooms;
  }

  public async findByName(name: string | null): Promise<Room[]> {
    var findRooms = [];
    if(name){
      var search = new RegExp(name , 'i');
      findRooms = fakeDataBase.rooms.filter(item => search.test(item.name));
    }
    else
      findRooms = fakeDataBase.rooms;

    findRooms.forEach(room => {
      const socketRoom = io.sockets.adapter.rooms[`room-${room.id}`];
      if(socketRoom)
        room.qty_user = socketRoom.length;
    });

    return findRooms;
  }

  public async findById(id: string): Promise<Room | undefined> {
    const room = fakeDataBase.rooms.find(room => room.id === id)
    if(room){
      const socketRoom = io.sockets.adapter.rooms[`room-${room.id}`];
        if(socketRoom)
          room.qty_user = socketRoom.length;
    }

    return room;
  }

  public async findIndexById(id: string): Promise<number> {
    const index = fakeDataBase.rooms.findIndex(room => room.id === id)

    return index;
  }

  public async create(roomData: ICreateRoomDTO): Promise<Room> {
    const room = new Room();

    Object.assign(room, {
      id: uuid(),
      lines: [],
      messages: [],
      qty_user: 0,
      game: false,
      game_word: ''
    }, roomData);

    fakeDataBase.rooms.push(room);

    return room;
  }

  public async updateGameStatus(id: string, status: boolean): Promise<Room | undefined> {
    const index = fakeDataBase.rooms.findIndex(room => room.id === id)
    const room = fakeDataBase.rooms.find(room => room.id === id)
    if(room){
      room.game = status;

      fakeDataBase.rooms[index] = room;
    }

    return room;
  }

  public async updateGameWord(id: string, word: string): Promise<Room | undefined> {
    const index = fakeDataBase.rooms.findIndex(room => room.id === id)
    const room = fakeDataBase.rooms.find(room => room.id === id)
    if(room){
      room.game_word = word;

      fakeDataBase.rooms[index] = room;
    }

    return room;
  }
}

export default RoomRepository;
