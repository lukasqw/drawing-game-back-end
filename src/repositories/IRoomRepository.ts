import Room from '../models/Room';
import ICreateRoomDTO from '../dtos/ICreateRoomDTO';

export default interface IRoomRepository {
  get(): Promise<Room[]>;
  findByName(name: string | null): Promise<Room[]>;
  findById(id: string): Promise<Room | undefined>;
  create(data: ICreateRoomDTO): Promise<Room>;
  updateGameStatus(id: string, status: boolean): Promise<Room | undefined>;
  updateGameWord(id: string, word: string): Promise<Room | undefined>;
}
