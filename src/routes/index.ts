import { Router } from 'express';

import RoomsRouter from './rooms.routes';
import UsersRouter from './users.routes';

const routes = Router();

routes.use('/rooms', RoomsRouter);
routes.use('/users', UsersRouter);

export default routes;
