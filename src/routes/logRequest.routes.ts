import { Request, Response, NextFunction } from 'express'

export default function logRequests(request: Request, response: Response, next: NextFunction){
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
};
