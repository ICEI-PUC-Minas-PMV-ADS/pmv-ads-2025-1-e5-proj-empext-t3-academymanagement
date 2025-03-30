import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.post('/', userController.create);
router.get('/', userController.findAll);
router.put('/:id', userController.update);
router.get('/:id', userController.findOne);
router.delete('/:id', userController.remove);

export default router;