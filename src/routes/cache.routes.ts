import CacheController from '@/controllers/cache.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

class CacheRoutes implements Routes {
  public path = '/cache';
  public router = Router();
  public controller = new CacheController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.getStats);
  }
}

export default CacheRoutes;
