import { RouteDefinition } from '@/interfaces/routes.interface';

const repoRoutes: RouteDefinition[] = [{ path: '/' }, { path: '/:owner/:repo/pulls' }];

export default repoRoutes;
