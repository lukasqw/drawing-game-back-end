import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import http from 'http';

import routes from './routes';
import AppError from './errors/AppError';
import { SocketInit } from './socket';
import socketRoute from './socket/routes';
import logRequest from './routes/logRequest.routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(logRequest);
app.use(routes);

const server = http.createServer(app);
const io = SocketInit(server);
socketRoute(io);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default server;
