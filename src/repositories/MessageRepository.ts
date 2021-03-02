import { uuid } from 'uuidv4';

import IMessageRepository from './IMessageRepository';

import Message from '../models/Message';
import ICreateMessageDTO from '../dtos/ICreateMessageDTO';

import fakeDataBase from '../FakeDataBase';

class MessageRepository implements IMessageRepository {

  public async get(indexRoom: number): Promise<Message[] | undefined>{

    const findMessages = fakeDataBase.rooms[indexRoom].messages;

    return findMessages;
  }

  public async create(indexRoom: number, messageData : ICreateMessageDTO): Promise<Message>{
    const message = new Message();

    Object.assign(message, { id: uuid() }, messageData);

    fakeDataBase.rooms[indexRoom].messages.push(message);

    return message;
  }

  public async deleteAll(indexRoom: number): Promise<void>{
    fakeDataBase.rooms[indexRoom].messages = [];
  }
}

export default MessageRepository;
