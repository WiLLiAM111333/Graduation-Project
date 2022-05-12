import { Request, Response } from 'express';

export type ControllerRouteFunction = (req: Request, res: Response) => Awaited<void>
