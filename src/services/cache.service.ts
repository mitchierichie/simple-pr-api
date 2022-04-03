import NodeCache, { Key as NodeCacheKey } from 'node-cache';

const secondsInTenMinutes = 600;
const secondsInAnHour = 3600;
const tenThousand = 10000;

export type CacheKey = NodeCacheKey;
declare type Key = NodeCacheKey;

class CacheService {
  private static nodeCache = new NodeCache({
    stdTTL: secondsInAnHour,
    checkperiod: secondsInTenMinutes,
    maxKeys: tenThousand,
  });

  public static has(key: Key) {
    return this.nodeCache.has(key);
  }

  public static set<Type>(key: Key, value: Type) {
    return this.nodeCache.set<Type>(key, value);
  }

  public static get<Type>(key: Key) {
    return this.nodeCache.get<Type>(key);
  }

  public static instance() {
    return this.nodeCache;
  }

  public static isKey(key: any) {
    return ['string', 'number'].includes(typeof key);
  }
}

export default CacheService;
