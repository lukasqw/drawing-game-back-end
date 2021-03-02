import { Router } from 'express';

import UserRepository from '../repositories/UserRepository';

const UserRouter = Router();

UserRouter.get('/', async (request, response) => {
  const userRepository = new UserRepository();

  const messages = await userRepository.get();

  return response.json(messages);
});

UserRouter.post('/', async (request, response) => {
  const data = request.body;

  const userRepository = new UserRepository();

  const message = await userRepository.create(data);

  return response.json(message);
});

UserRouter.delete('/:id_user', async (request, response) => {
  const { id_user } = request.params;

  const userRepository = new UserRepository();

  const message = await userRepository.delete(id_user);

  return response.json({ ok: true });
});


export default UserRouter;
