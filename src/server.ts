import App from '@/app';
import IndexRoutes from '@routes/index.routes';
import ReposRoutes from '@routes/repos.routes';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoutes(), new ReposRoutes()]);

app.listen();
