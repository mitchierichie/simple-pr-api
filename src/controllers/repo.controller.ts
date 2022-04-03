import repoRoutes from '@/models/repoRoutes.model';
import { RouteFunction } from '@/interfaces/routes.interface';
import RepoService from '@/services/repo.service';

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
      const { owner, repo } = req.params;
      const { query } = req;
      const pulls = await this.repoService.getPulls(owner, repo, query);

      res.status(200).json({ data: pulls, message: 'getPulls' });
    } catch (error) {
      next(error);
    }
  };
}

export default RepoController;
