import repoRoutes from '@/models/repoRoutes.model';
import { RouteFunction } from '@/interfaces/routes.interface';
import RepoService, { PullRequestState } from '@/services/repo.service';

class RepoController {
  private repoService = new RepoService();

  public index: RouteFunction = async (req, res, next): Promise<void> => {
    try {
      res.status(200).json({ data: repoRoutes, message: 'index' });
    } catch (error) {
      next(error);
    }
  };

  public getPulls: RouteFunction = async (req, res, next): Promise<void> => {
    try {
      const { owner, repo, state } = req.params;
      const pulls = await this.repoService.getPulls(owner, repo, state as PullRequestState | undefined);

      res.status(200).json({ data: pulls, message: 'getPulls' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default RepoController;
