import { GITHUB_TOKEN } from '@/config';
import { RequestOptions } from 'https';
import QueryString from 'qs';
import CacheService, { CacheKey } from './cache.service';

const GITHUB_API_BASE_URL = 'api.github.com';

class GitHubService {
  protected mergeRequestOptions(options: { path: string; body?: string }) {
    const mergedOptions = {
      hostname: GITHUB_API_BASE_URL,
      port: 443,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'mitchieriche/simple-pr-api',
        Authorization: `Basic ${GITHUB_TOKEN}`,
      },
      ...options,
    };

    return this.tryToMergeETag(mergedOptions);
  }

  protected createPathRegex() {
    return new RegExp(`/^https:\/\/${GITHUB_API_BASE_URL}\/`);
  }

  private tryToMergeETag(options: RequestOptions) {
    const eTag = CacheService.get<CacheKey>(options.path);

    if (eTag && CacheService.isKey(eTag) && CacheService.has(eTag)) {
      options.headers['If-None-Match'] = eTag;
    }

    return options;
  }

  protected addQueryToPath(path: string, query?: QueryString.ParsedQs) {
    return `${path}?${QueryString.stringify(query)}`;
  }
}

export default GitHubService;
