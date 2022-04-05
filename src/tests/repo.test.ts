import request from 'supertest';
import App from '@/app';
import RepoRoutes from '@routes/repo.routes';
import repoRouteDefinitions from '@models/repoRoutes.model';

const testRepo = 'expressjs/express';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Repo Routes', () => {
  describe('[GET] /repos', () => {
    it('response statusCode 200', () => {
      const repoRoutes = new RepoRoutes();
      const app = new App([repoRoutes]);

      return request(app.getServer()).get(repoRoutes.path).expect(200, { data: repoRouteDefinitions, message: 'index' });
    });
  });

  describe(`[GET] /repos/${testRepo}/pulls`, () => {
    it('response statusCode 200', () => {
      const repoRoutes = new RepoRoutes();
      const app = new App([repoRoutes]);
      const server = app.getServer();
      const path = `${repoRoutes.path}/${testRepo}/pulls`;

      return request(server)
        .get(path)
        .expect(200)
        .expect(res => {
          if (!Array.isArray(res.body.data)) {
            throw new Error('Response body must contain data key with an array');
          }

          if (!res.body.data.length) {
            throw new Error('No open pull requests!');
          }

          res.body.data.forEach((pull: { id: number; number: number; title: string; author: string; commit_count: number }) => {
            ['id', 'number', 'title', 'author', 'commit_count'].forEach(key => {
              if (key in pull) {
                return;
              }

              throw new Error(`${key} missing from pull in ${testRepo}!`);
            });
          });
        });
    });
  });
});
