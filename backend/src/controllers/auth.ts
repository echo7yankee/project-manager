import {
  loginValidation,
  registerValidation,
  updateUserValidation
} from '../databaseStorage/models/validation';

import { comparePassword, encryptPassword } from '../encoder/bcryptEncoder';
import { createToken } from '../token/jwt';

//ts types
import { Request, Response } from 'express';
import { RegisterUser, UserDatabase } from '../TSTypes/User';
import { UserDao } from '../databaseStorage/UserDao';
import { ProjectDao } from '../databaseStorage/ProjectDao';
import { TaskDao } from '../databaseStorage/TaskDao';

type TokenParams = {
  id: string;
  userRole: string;
};

export class Authenticate {
  userDao: UserDao;
  projectDao: ProjectDao;
  taskDao: TaskDao;
  constructor(userDao, projectDao, taskDao) {
    this.userDao = userDao;
    this.projectDao = projectDao;
    this.taskDao = taskDao;
  }
  //REGISTER USER
  public createUser = async (req: Request, res: Response) => {
    const { error } = registerValidation(req.body);

    //Check if form has errors
    if (error) {
      const errorMessage: string = error.details.pop().message;
      const pureErrorMessage: string = errorMessage.replace(/\"/g, '');
      return res.status(400).json({ error: pureErrorMessage });
    }

    //Check if same users exists
    const emailExists = await this.userDao.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const { hashedPassword, hashedConfirmPassword } = await encryptPassword(
      req.body.password,
      req.body.confirmPassword
    );

    //Register user
    const newUser: RegisterUser = {
      ...req.body,
      role: 'Sw programmer',
      confirmPassword: hashedConfirmPassword,
      password: hashedPassword,
    };

    try {
      const user = await this.userDao.add(newUser);

      const tokenParams: TokenParams = { id: user._id, userRole: user.role };

      //Create and assign a token
      const token: string = await createToken({ params: tokenParams });
      res.header('authToken', token);
      return res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  public updateUserDetails = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { error } = updateUserValidation(req.body);

      console.log('Body', req.body);

      //Check if form has errors
      if (error) {
        const errorMessage: string = error.details.pop().message;
        const pureErrorMessage: string = errorMessage.replace(/\"/g, '');
        return res.status(400).json({ error: pureErrorMessage });
      }

      //Check if same users exists
      const emailExists = await this.userDao.findOne({ email: req.body.email });
      const thisUser = await this.userDao.findById(id);
      if (emailExists && thisUser.email !== emailExists.email) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const updatedUserDetails = await this.userDao.update(id, req.body);
      return res.status(200).json(updatedUserDetails);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  //LOGIN USER
  public loginUser = async (req: Request, res: Response) => {
    const { error } = loginValidation(req.body);
    if (error) {
      const errorMessage: string = error.details.pop().message;
      const pureErrorMessage: string = errorMessage.replace(/\"/g, '');
      return res.status(400).json({ error: pureErrorMessage });
    }
    try {
      //Check if same users exists
      const user: UserDatabase = await this.userDao.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res.status(400).json({ error: 'Email or password is wrong' });
      }

      //Check if password is correct
      const validPassword: string = await comparePassword(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(400).json({ error: 'Email or password is wrong' });
      }

      const tokenParams: TokenParams = { id: user._id, userRole: user.role };

      //Create and assign a token
      const token: string = await createToken({ params: tokenParams });
      await res.header('authToken', token);
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };

  public removeUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await this.userDao.findById(id);

      //Check if password is correct
      const validPassword: string = await comparePassword(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(400).json({ error: 'Password incorrect' });
      }

      const deletedUser: UserDatabase = await this.userDao.remove(id);

      await this.projectDao.removeAll({ userId: id });
      await this.taskDao.removeAll({ userId: id });
      if (deletedUser === null) {
        return res.status(400).json({ error: `User with id ${id} does not exist` });
      };

      return res.status(200).json({ message: `User with id ${id} has been removed` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }
}
