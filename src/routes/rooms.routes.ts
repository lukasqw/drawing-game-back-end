import { Router, Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';
import RoomRepository from '../repositories/RoomRepository';

import LinesRouter from './rooms.lines.routes';
import MessagesRouter from './rooms.message.routes';

const RoomsRouter = Router();

RoomsRouter.get('/', async (request, response) => {
  const roomRepository = new RoomRepository();

  const rooms = await roomRepository.get();

  return response.json(rooms);
})

RoomsRouter.get('/:name', async (request, response) => {
  const name = request.params.name;

  const roomRepository = new RoomRepository();

  const rooms = await roomRepository.findByName(name);

  return response.json(rooms);
})

RoomsRouter.post('/', async (request, response) => {
  const { name, type, max_users } = request.body;

  const roomRepository = new RoomRepository();

  const room = await roomRepository.create({
    name,
    type,
    max_users
  })

  return response.json(room);
});

async function RoomExist(request: Request, response: Response, next: NextFunction){
  const { id } = request.params;

  const roomRepository = new RoomRepository();

  const indexRoom = await roomRepository.findIndexById(id);
  if(indexRoom < 0){
    throw new AppError(`room with id: ${id} not found`, 404);
  }

  response.locals.indexRoom = indexRoom.toString();

  next();
};

RoomsRouter.use('/:id/lines', RoomExist, LinesRouter);
RoomsRouter.use('/:id/messages', RoomExist, MessagesRouter);

export default RoomsRouter;
