import { RouteDefinition } from '@/interfaces/routes.interface';
import repoRoutes from './repoRoutes.model';

const routes: RouteDefinition[] = [{ path: '/' }, { path: '/api-docs' }, ...repoRoutes];

export default routes;
