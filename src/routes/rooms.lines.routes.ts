import { Router } from 'express';

import LineRepository from '../repositories/LineRepository';

const LinesRouter = Router();

LinesRouter.get('/', async (request, response) => {
  const { indexRoom } = response.locals;

  const lineRepository = new LineRepository();

  const lines = await lineRepository.get(indexRoom);

  return response.json(lines);
});

LinesRouter.post('/', async (request, response) => {
  const { indexRoom } = response.locals;
  const data = request.body;

  const lineRepository = new LineRepository();

  const line = await lineRepository.create(indexRoom, data);

  return response.json(line);
});

export default LinesRouter;
