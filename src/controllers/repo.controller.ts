import { NextFunction, Request, Response } from 'express';
import repoRoutes from '@/models/repoRoutes.model';

class RepoController {
  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: repoRoutes, message: 'index' });
    } catch (error) {
      next(error);
    }
  };
}

export default RepoController;
