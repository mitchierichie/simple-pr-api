import NodeCache, { Key } from 'node-cache';

const secondsInAnHour = 3600;
const oneHundredThousand = 100000;

class CacheService {
  private static nodeCache = new NodeCache({
    stdTTL: secondsInAnHour,
    maxKeys: oneHundredThousand,
  });

  public static has(key: Key) {
    return this.nodeCache.has(key);
  }

  public static set(key: Key, value: any) {
    return this.nodeCache.set(key, value);
  }

  public static get<Type>(key: Key) {
    return this.nodeCache.get<Type>(key);
  }

  public static getMultiple(keys: Key[]) {
    return this.nodeCache.mget(keys);
  }

  public static getAll() {
    return this.nodeCache.mget(this.nodeCache.keys());
  }

  public static stats() {
    return this.nodeCache.getStats();
  }

  public static isKey(key: any) {
    return ['string', 'number'].includes(typeof key);
  }
}

export default CacheService;
