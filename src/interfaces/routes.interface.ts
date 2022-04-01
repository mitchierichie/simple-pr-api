import { Router } from 'express';

declare interface BaseRouteDefinition {
  path?: string;
}

export interface Routes extends BaseRouteDefinition {
  router: Router;
}

export interface RouteDefinition extends BaseRouteDefinition {
  description?: string;
}
