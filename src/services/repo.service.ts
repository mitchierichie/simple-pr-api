import { GITHUB_TOKEN } from '@/config';
import { CacheHitResponse } from '@/interfaces/https.interface';
import { PullRequestDetail } from '@/interfaces/pull.interface';
import { NormalizedPullRequest, NormalizedPullRequests, PullRequests } from '@/interfaces/pulls.interface';
import HttpsService from '@services/https.service';
import { OutgoingHttpHeader } from 'http';
import { RequestOptions } from 'https';
import { Key } from 'node-cache';
import qs from 'qs';
import CacheService from './cache.service';

const GITHUB_API_BASE_URL = 'api.github.com';

declare type PullPathFunction<Type> = (owner: string, repo: string, query?: qs.ParsedQs) => Type;
declare type PullsResponse = PullRequests | CacheHitResponse<NormalizedPullRequests>;

class RepoService {
  public getPulls: PullPathFunction<Promise<string | NormalizedPullRequests>> = async (owner, repo, query) => {
    const path = this.buildPath(owner, repo, query);
    const options = this.mergeRequestOptions({
      path,
    });
    const httpsService = new HttpsService();

    const pullsResponse = await httpsService.get(options, true);

    return this.normalizePullsResponse(pullsResponse, path);
  };

  private buildPath: PullPathFunction<string> = (owner, repo, query) => {
    const path = `/repos/${owner}/${repo}/pulls`;

    if (!query) {
      return path;
    }

    return `${path}?${qs.stringify(query)}`;
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

  private async normalizePullsResponse(pullsResponse: PullsResponse, path: Key): Promise<string | NormalizedPullRequests> {
    if (typeof pullsResponse === 'string') {
      return pullsResponse;
    }

    if ('cacheHit' in pullsResponse) {
      return pullsResponse.data;
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
