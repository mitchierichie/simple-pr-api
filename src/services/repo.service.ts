import { GITHUB_TOKEN } from '@/config';
import { CacheHitResponse } from '@/interfaces/https.interface';
import { PullRequestDetail } from '@/interfaces/pull.interface';
import { NormalizedPullRequest, NormalizedPullRequests, PullRequests } from '@/interfaces/pulls.interface';
import HttpsService from '@services/https.service';
import { OutgoingHttpHeader } from 'http';
import { RequestOptions } from 'https';
import { Key } from 'node-cache';
import CacheService from './cache.service';

const GITHUB_API_BASE_URL = 'api.github.com';

export type PullRequestState = 'all' | 'closed' | 'open';

class RepoService {
  public getPulls = async (owner: string, repo: string) => {
    const path = `/repos/${owner}/${repo}/pulls`;
    const options = this.mergeRequestOptions({
      path,
    });
    const httpsService = new HttpsService();
    const pullsResponse = await httpsService.get(options);

    return this.normalizePullsResponse(pullsResponse, path);
  };

  private mergeRequestOptions(options: { path: string; body?: string }) {
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

  private normalizePullsResponse(pullsResponse: PullRequests | CacheHitResponse<NormalizedPullRequests>, path: Key) {
    if (typeof pullsResponse === 'string') {
      return pullsResponse;
    }

    if ('cacheHit' in pullsResponse) {
      return pullsResponse.cacheHit ? pullsResponse.data : pullsResponse;
    }

    if (typeof pullsResponse.forEach === 'function') {
      let eTag = CacheService.get(path);
      eTag = CacheService.isKey(eTag) ? eTag : undefined;

      return this.normalizePulls(pullsResponse, eTag as OutgoingHttpHeader | undefined);
    }

    return [];
  }

  private async normalizePulls(pulls: PullRequests, eTag?: OutgoingHttpHeader): Promise<NormalizedPullRequests> {
    const pullsDetailPromises = [];

    pulls.forEach(pull => {
      pullsDetailPromises.push(this.fetchPullDetails(pull));
    });

    return Promise.all(pullsDetailPromises).then(pullsDetails => {
      const normalizedPulls = pullsDetails.map(this.normalizePull);

      if (CacheService.isKey(eTag)) {
        CacheService.set(eTag as Key, normalizedPulls);
      }

      return normalizedPulls;
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

  private normalizePull = (pullDetails: PullRequestDetail): NormalizedPullRequest => ({
    id: pullDetails.id,
    title: pullDetails.title,
    number: pullDetails.number,
    author: pullDetails.user?.login,
    commit_count: pullDetails.commits,
  });

  private createGitHubPathRegex() {
    return new RegExp(`/^https:\/\/${GITHUB_API_BASE_URL}\/`);
  }

  private tryToMergeETag(options: RequestOptions) {
    const eTag = CacheService.get<Key>(options.path);

    if (eTag && CacheService.isKey(eTag) && CacheService.has(eTag)) {
      options.headers['If-None-Match'] = eTag;
    }

    return options;
  }
}

export default RepoService;
