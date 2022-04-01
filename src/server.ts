import App from '@/app';
import IndexRoutes from '@/routes/index.routes';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoutes()]);

app.listen();
