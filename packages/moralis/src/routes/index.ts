import { Application } from 'express';
import moralisRouter from './api/moralis.route';

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/moralis', moralisRouter);
  }
}

export default AppRouter;
