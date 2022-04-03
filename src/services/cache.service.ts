class CacheService {
  private static eTags = {};

  public static addETag(path: string, etag: string) {
    this.eTags[path] = etag;
  }

  public static getETag(path: string) {
    const eTag = `${this.eTags[path]}`;
    delete this.eTags[path];

    return eTag;
  }
}

export default CacheService;
