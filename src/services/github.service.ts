import { GITHUB_HAS_TOKEN, GITHUB_TOKEN } from '@/config';
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
      },
      ...options,
    };

    return this.mergeOptionalRequestOptions(mergedOptions);
  }

  protected createPathRegex() {
    return new RegExp(`/^https:\/\/${GITHUB_API_BASE_URL}\/`);
  }

  private mergeOptionalRequestOptions(options: RequestOptions) {
    options = this.tryToMergeAuthorizationHeader(options);

    return this.tryToMergeETag(options);
  }

  private tryToMergeAuthorizationHeader(options: RequestOptions) {
    if (GITHUB_HAS_TOKEN) {
      options.headers.Authorization = `Basic ${GITHUB_TOKEN}`;
    }

    return options;
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
