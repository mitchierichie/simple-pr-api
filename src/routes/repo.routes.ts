import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import RepoController from '@/controllers/repo.controller';

class RepoRoutes implements Routes {
  public path = '/repos';
  public router = Router();
  public repoController = new RepoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    return;
  }
}

export default RepoRoutes;
