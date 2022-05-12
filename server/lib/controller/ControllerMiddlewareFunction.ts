import { Request, Response, NextFunction } from 'express';

export type ControllerMiddlewareFunction = (req: Request, res: Response, next: NextFunction) => Awaited<void>;