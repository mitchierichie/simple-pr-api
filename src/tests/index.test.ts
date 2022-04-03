import request from 'supertest';
import App from '@/app';
import IndexRoutes from '@routes/index.routes';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const indexRoutes = new IndexRoutes();
      const app = new App([indexRoutes]);

      return request(app.getServer()).get(`${indexRoutes.path}`).expect(200);
    });
  });
});
