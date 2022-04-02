import { NextFunction, Request, Response } from 'express';
import repoRoutes from '@/models/repoRoutes.model';
import { RouteFunction } from '@/interfaces/routes.interface';

class RepoController {
  public index: RouteFunction = async (req, res, next): Promise<void> => {
    try {
      res.status(200).json({ data: repoRoutes, message: 'index' });
    } catch (error) {
      next(error);
    }
  };

  public getPulls: RouteFunction = (req, res, next): Promise<void> => {};
}

export default RepoController;
