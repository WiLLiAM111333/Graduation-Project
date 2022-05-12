import { RequestHandler } from 'express';

export interface IControllerMethod {
  method: HTTPMethod;
  handler: RequestHandler | Array<RequestHandler>;
  path: string;
  cache?: {
    enabled: boolean;
    duration?: number;
  }
}
