import { RouteDefinition } from '@/interfaces/routes.interface';
const repoRoutes: RouteDefinition[] = [{ path: '/repos' }, { path: '/repos/:owner/:repo/pulls' }];

export default repoRoutes;
