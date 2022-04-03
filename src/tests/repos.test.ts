import request from 'supertest';
import App from '@/app';
import RepoRoutes from '@routes/repo.routes';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Repo Routes', () => {
  describe('[GET] /repos', () => {
    it('response statusCode 200|304', () => {
      const repoRoutes = new RepoRoutes();
      const app = new App([repoRoutes]);

      return request(app.getServer())
        .get(repoRoutes.path)
        .expect(function (res) {
          if ([200, 304].includes(res.statusCode)) {
            return;
          }

          throw new Error(`Response status code: ${res.statusCode}\nExpected: 200, 304`);
        });
    });
  });
});
