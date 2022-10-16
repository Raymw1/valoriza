import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let authToken: string | string[] = request.headers.authorization;
  if (!authToken) return response.status(401).end();
  authToken = authToken.split(' ');
  if (authToken.length !== 2 || authToken[0] !== 'Bearer')
    return response.status(401).json({ message: 'Invalid token!' });
  const token = authToken[1];
  try {
    const { sub } = verify(
      token,
      '06c219e5bc8378f3a8a3f83b4b7e4649'
    ) as IPayload;
    request.user_id = sub;
    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
