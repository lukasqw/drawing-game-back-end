import Message from '../models/Message';

export default interface ICreateMessageDTO {
  message: Omit<Message, 'id'>;
}
