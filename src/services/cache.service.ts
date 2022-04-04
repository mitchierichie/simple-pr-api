import NodeCache, { Key as NodeCacheKey } from 'node-cache';

declare type Key = NodeCacheKey;
export type CacheKey = NodeCacheKey;

const secondsInAnHour = 3600;
const tenThousand = 10000;
const FULL_CACHE_ERROR = 'ECACHEFULL';

class CacheService {
  private static nodeCache = new NodeCache({
    stdTTL: secondsInAnHour,
    maxKeys: tenThousand,
  });

  public static has(key: Key) {
    return this.nodeCache.has(key);
  }

  public static set<Type>(key: Key, value: Type) {
    try {
      return this.nodeCache.set<Type>(key, value);
    } catch (error) {
      if (error.name !== FULL_CACHE_ERROR) {
        throw error;
      }

      const [firstKey] = this.nodeCache.keys();
      const firstKeyValue = this.nodeCache.take(firstKey);
      this.isKey(firstKeyValue) && this.nodeCache.has(firstKeyValue as Key) && this.nodeCache.del(firstKeyValue as Key);

      return this.nodeCache.set<Type>(key, value);
    }
  }

  public static get<Type>(key: Key) {
    return this.nodeCache.get<Type>(key);
  }

  public static instance() {
    return this.nodeCache;
  }

  public static isKey(key: unknown) {
    return ['string', 'number'].includes(typeof key);
  }
}

export default CacheService;
