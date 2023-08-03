import express from 'express';
import cors from 'cors';
import Moralis from 'moralis';
import AppRouter from './routes';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app = express();
const port = process.env.PORT || 3001;
const router = new AppRouter(app);

app.use(cors());
app.use(express.json());

router.init();

app.use(errorHandler);
Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});
