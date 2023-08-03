import { Router } from 'express';
import tryCatchMiddleware from '../../middlewares/tryCatch.middleware';
import { moralisController } from '../../controllers/moralis.controller';

const moralisRouter: Router = Router();

moralisRouter.get(
  '/get_owners',
  tryCatchMiddleware(moralisController.getOwners.bind(moralisController))
);

export default moralisRouter;
