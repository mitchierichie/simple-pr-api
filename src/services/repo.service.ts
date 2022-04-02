import HttpsService from '@services/https.service';

const GITHUB_API_BASE_URL = 'api.github.com';

export type PullRequestState = 'all' | 'closed' | 'open';

class RepoService {
  public getPulls = async (owner: string, repo: string, state: PullRequestState = 'open') => {
    const path = `/repos/${owner}/${repo}/pulls`;
    const httpsService = new HttpsService();

    return httpsService.get(
      this.mergeRequestOptions({
        path,
      }),
    );
  };

  private mergeRequestOptions(options: { path: string; body?: string }) {
    return {
      hostname: GITHUB_API_BASE_URL,
      port: 443,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'nodejs express server - simple-pr-api',
      },
      ...options,
    };
  }
}

export default RepoService;
