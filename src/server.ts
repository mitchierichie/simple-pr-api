import App from '@/app';
import IndexRoutes from '@routes/index.routes';
import RepoRoutes from '@/routes/repo.routes';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoutes(), new RepoRoutes()]);

app.listen();
