import { Router } from 'express';

import { ensureAdmin } from './middlewares/ensureAdmin';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();

router.post('/users', createUserController.handle);
router.post('/session', authenticateUserController.handle);
router.post('/tags', ensureAdmin, createTagController.handle);

export { router };
