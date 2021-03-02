import { Router } from 'express';

import MessageRepository from '../repositories/MessageRepository';

const MessageRouter = Router();

MessageRouter.get('/', async (request, response) => {
  const { indexRoom } = response.locals;

  const messageRepository = new MessageRepository();

  const messages = await messageRepository.get(indexRoom);

  return response.json(messages);
});

MessageRouter.post('/', async (request, response) => {
  const { indexRoom } = response.locals;
  const data = request.body;

  const messageRepository = new MessageRepository();

  const message = await messageRepository.create(indexRoom, data);

  return response.json(message);
});

MessageRouter.delete('/', async (request, response) => {
  const { indexRoom } = response.locals;

  const messageRepository = new MessageRepository();

  await messageRepository.deleteAll(indexRoom);

  return response.json({ ok: true });
});


export default MessageRouter;
