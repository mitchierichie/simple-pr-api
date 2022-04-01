import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

class UsersRoute implements Routes {
  public path = '/repos';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    return;
  }
}

export default UsersRoute;
