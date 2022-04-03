import { RouteFunction } from '@/interfaces/routes.interface';
import CacheService from '@/services/cache.service';

class CacheController {
  public getStats: RouteFunction = async (req, res, next) => {
    try {
      res.status(200).json(CacheService.instance().getStats());
    } catch (error) {
      next(error);
    }
  };
}

export default CacheController;
