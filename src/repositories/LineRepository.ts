import { uuid } from 'uuidv4';

import ILineRepository from './ILineRepository';

import Line from '../models/Line';
import ICreateRoomDTO from '../dtos/ICreateLineDTO';

import fakeDataBase from '../FakeDataBase';

class LineRepository implements ILineRepository {

  public async get(indexRoom: number): Promise<Line[] | undefined>{
    const findLines = fakeDataBase.rooms[indexRoom].lines;

    return findLines;
  }

  public async create(indexRoom: number, lineData : ICreateRoomDTO): Promise<Line>{
    const line = new Line();

    Object.assign(line, { id: uuid() }, lineData);

    fakeDataBase.rooms[indexRoom].lines.push(line);

    return line;
  }

  public async deleteAll(indexRoom: number): Promise<void>{
    fakeDataBase.rooms[indexRoom].lines = [];
  }
}

export default LineRepository;
