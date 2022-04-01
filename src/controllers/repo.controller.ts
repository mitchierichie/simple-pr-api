import { RouteDefinition } from '@/interfaces/routes.interface';

class RepoController {
  public async index(): Promise<RouteDefinition[]> {
    return [
      {
        path: '/',
      },
      {
        path: '/:owner/:repo/pulls',
        description: 'Returns info about pull requests in a repository',
      },
      {
        path: '/:owner/:repo/pulls/:state',
        description: 'Returns info about pull requests in a repository, filtered by pull request state (open, closed, or all)',
      },
    ];
  }
}

export default RepoController;
