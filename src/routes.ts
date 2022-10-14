import { Router } from 'express';

import { ensureAdmin } from './middlewares/ensureAdmin';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

router.post('/users', createUserController.handle);
router.post('/tags', ensureAdmin, createTagController.handle);

export { router };
