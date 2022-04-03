import NodeCache, { Key } from 'node-cache';

const secondsInAnHour = 3600;
const oneHundredThousand = 100000;

class CacheService {
  private static nodeCache = new NodeCache({
    // comment for commit
    stdTTL: secondsInAnHour,
    maxKeys: oneHundredThousand,
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

  public static isKey(key: any) {
    return ['string', 'number'].includes(typeof key);
  }
}

export default CacheService;
