import { NextFunction, Request, Response, Router } from 'express';

declare interface BaseRouteDefinition {
  path?: string;
}

export interface Routes extends BaseRouteDefinition {
  router: Router;
}

export interface RouteDefinition extends BaseRouteDefinition {
  description?: string;
}

export type RouteFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;
