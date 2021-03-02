import Message from '../models/Message';
import ICreateMessageDTO from '../dtos/ICreateMessageDTO';

export default interface IMessageRepository {
  create(indexRoom: number, data: ICreateMessageDTO): Promise<Message>;
  get(indexRoom: number): Promise<Message[] | undefined>;
  deleteAll(indexRoom: number): Promise<void>;
}
