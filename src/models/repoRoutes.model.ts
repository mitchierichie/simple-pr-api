import { RouteDefinition } from '@/interfaces/routes.interface';

const repoRoutes: RouteDefinition[] = [{ path: '/' }, { path: '/:owner/:repo/pulls' }, { path: '/:owner/:repo/pulls/:state' }];

export default repoRoutes;
