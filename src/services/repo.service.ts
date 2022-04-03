import HttpsService from '@services/https.service';
import { RequestOptions } from 'https';

const GITHUB_API_BASE_URL = 'api.github.com';

export type PullRequestState = 'all' | 'closed' | 'open';

class RepoService {
  private static eTags = {};

  public getPulls = async (owner: string, repo: string) => {
    const path = `/repos/${owner}/${repo}/pulls`;
    const httpsService = new HttpsService();

    const pulls = await httpsService.get(
      this.mergeRequestOptions({
        path,
      }),
    );

    return this.normalizePulls(pulls);
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

    return mergedOptions;
    // return this.tryToMergeETag(mergedOptions);
  }

  private async normalizePulls(pulls: any[]) {
    const pullsDetailPromises = [];

    pulls.forEach(pull => {
      pullsDetailPromises.push(this.fetchPullDetails(pull));
    });

    return Promise.all(pullsDetailPromises).then(pullsDetails => {
      return pullsDetails.map(pullDetails => ({
        id: pullDetails.id,
        number: pullDetails.number,
        author: pullDetails.user?.login,
        commit_count: pullDetails.commits,
      }));
    });
  }

  private fetchPullDetails(pull) {
    const httpsService = new HttpsService();

    return httpsService.get(
      this.mergeRequestOptions({
        path: pull.url.replace(this.createGitHubPathRegex, '/'),
      }),
    );
  }

  private createGitHubPathRegex() {
    return new RegExp(`/^https:\/\/${GITHUB_API_BASE_URL}\/`);
  }

  private tryToMergeETag(options: RequestOptions) {
    const eTag = RepoService.getETag(options.path);

    if (eTag) {
      options.headers['If-None-Match'] = eTag;
    }

    return options;
  }

  public static addETag(path: string, etag: string) {
    this.eTags[path] = etag;
  }

  public static getETag(path: string) {
    const eTag = `${this.eTags[path]}`;
    delete this.eTags[path];

    return eTag;
  }
}

export default RepoService;
