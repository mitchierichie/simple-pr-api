import HttpsService from '@services/https.service';
import { RequestOptions } from 'https';
import CacheService from './cache.service';

const GITHUB_API_BASE_URL = 'api.github.com';

export type PullRequestState = 'all' | 'closed' | 'open';

class RepoService {
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
      return pullsDetails.map(this.mapPullDetails);
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

  private mapPullDetails = pullDetails => ({
    id: pullDetails.id,
    number: pullDetails.number,
    author: pullDetails.user?.login,
    commit_count: pullDetails.commits,
  });

  private createGitHubPathRegex() {
    return new RegExp(`/^https:\/\/${GITHUB_API_BASE_URL}\/`);
  }

  private tryToMergeETag(options: RequestOptions) {
    const eTag = CacheService.getETag(options.path);

    if (eTag) {
      options.headers['If-None-Match'] = eTag;
    }

    return options;
  }
}

export default RepoService;
