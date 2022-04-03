import { NextFunction, Request, Response, Router } from 'express';

declare interface BaseRouteDefinition {
  path?: string;
}

export interface Routes extends BaseRouteDefinition {
  path: string;
  router: Router;
  controller: Object;
}

export interface RouteDefinition extends BaseRouteDefinition {
  description?: string;
}

export type RouteFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;
