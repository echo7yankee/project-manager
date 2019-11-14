import { Router } from 'express';

import { Authenticate } from '../controllers/auth';
//Dao
import { userDao, projectDao } from '../databaseStorage/daos';

export const authRouter: Router = Router();
const authenticate: Authenticate = new Authenticate(userDao, projectDao);

authRouter.post('/register', authenticate.createUser);
authRouter.post('/login', authenticate.loginUser);
authRouter.put('/update/:id', authenticate.updateUserDetails);
authRouter.delete('/remove/:id', authenticate.removeUser);