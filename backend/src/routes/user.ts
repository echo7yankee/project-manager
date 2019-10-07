import { Router } from 'express';
import { User } from '../controllers/user';

//Daos
import { userDao, roleDao } from '../databaseStorage/daos';

export const userRouter: Router = Router();

const user: User = new User(userDao, roleDao);

userRouter.get('/:id', user.getUserDetails);
