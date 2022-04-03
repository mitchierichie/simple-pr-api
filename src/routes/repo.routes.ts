import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import RepoController from '@/controllers/repo.controller';

class RepoRoutes implements Routes {
  public path = '/repos';
  public router = Router();
  public controller = new RepoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.index);
    this.router.get(`${this.path}/:owner/:repo/pulls`, this.controller.getPulls);
  }
}

export default RepoRoutes;
