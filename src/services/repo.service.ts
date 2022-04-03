import { CacheHitResponse } from '@/interfaces/https.interface';
import { PullRequestDetail } from '@/interfaces/pull.interface';
import { NormalizedPullRequest, NormalizedPullRequests, PullRequests } from '@/interfaces/pulls.interface';
import HttpsService from '@services/https.service';
import { OutgoingHttpHeader } from 'http';
import QueryString from 'qs';
import CacheService, { CacheKey } from './cache.service';
import GitHubService from './github.service';

declare type PullPathFunction<Type> = (owner: string, repo: string, query?: QueryString.ParsedQs) => Type;
declare type PullsResponse = PullRequests | CacheHitResponse<NormalizedPullRequests>;

class RepoService extends GitHubService {
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

    return this.addQueryToPath(path, query);
  };

  private async normalizePullsResponse(pullsResponse: PullsResponse, path: CacheKey): Promise<string | NormalizedPullRequests> {
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
        CacheService.set(eTag as CacheKey, normalizedPulls);
      }

      return normalizedPulls;
    });
  }

  private fetchPullDetails(pull) {
    const httpsService = new HttpsService();

    return httpsService.get(
      this.mergeRequestOptions({
        path: pull.url.replace(this.createPathRegex, '/'),
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
}

export default RepoService;
