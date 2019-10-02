
import { Router } from 'express';
export const authRouter: Router = Router();

import { Authenticate } from '../controllers/auth';
const authenticate: Authenticate = new Authenticate();

authRouter.post('/register', authenticate.createUser);
authRouter.post('/login', authenticate.loginUser);
