import HttpsService from '@services/https.service';
import { RequestOptions } from 'https';

const GITHUB_API_BASE_URL = 'api.github.com';

export type PullRequestState = 'all' | 'closed' | 'open';

class RepoService {
  private static eTags = {};

  public getPulls = async (owner: string, repo: string) => {
    const path = `/repos/${owner}/${repo}/pulls`;
    const httpsService = new HttpsService();

    return httpsService.get(
      this.mergeRequestOptions({
        path,
      }),
    );
  };

  private mergeRequestOptions(options: { path: string; body?: string }) {
    const mergedOptions = {
      hostname: GITHUB_API_BASE_URL,
      port: 443,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'mitchieriche/simple-pr-api',
      },
      ...options,
    };

    return this.tryToMergeETag(mergedOptions);
  }

  private tryToMergeETag(options: RequestOptions) {
    const eTag = RepoService.getETag(options.path);

    if (eTag) {
      options.headers['If-None-Match'] = eTag;
    }

    console.log('tryToMergeETag:options', options);

    return options;
  }

  public static addETag(path: string, etag: string) {
    this.eTags[path] = etag;
  }

  public static getETag(path: string) {
    return this.eTags[path];
  }
}

export default RepoService;
