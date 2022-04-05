import RepoController from '@/controllers/repo.controller';
import { RouteDefinition } from '@/interfaces/routes.interface';
import RepoRouter from '@/routes/repo.routes';
const repoRouter = new RepoRouter();

const repoRoutes: RouteDefinition[] = [{ path: '/' }, { path: '/:owner/:repo/pulls' }].map(route => ({
  ...route,
  path: `${repoRouter.path}${route.path}`,
}));

export default repoRoutes;
