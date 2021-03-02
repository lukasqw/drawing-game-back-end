import Line from '../models/Line';
import ICreateRoomDTO from '../dtos/ICreateLineDTO';

export default interface ILineRepository {
  create(indexRoom: number, data: ICreateRoomDTO): Promise<Line>;
  get(indexRoom: number): Promise<Line[] | undefined>;
  deleteAll(indexRoom: number): Promise<void>;
}
