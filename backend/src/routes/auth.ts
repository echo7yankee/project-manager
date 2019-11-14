import { Router } from 'express';

import { Authenticate } from '../controllers/auth';
//Dao
import { userDao } from '../databaseStorage/daos';

export const authRouter: Router = Router();
const authenticate: Authenticate = new Authenticate(userDao);

authRouter.post('/register', authenticate.createUser);
authRouter.post('/login', authenticate.loginUser);
authRouter.put('/update/:id', authenticate.updateUserDetails);
