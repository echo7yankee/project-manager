
import { userDao } from '../databaseStorage/daos';
import { UserDao } from '../databaseStorage/UserDao';
const dao: UserDao = userDao;

import {
  loginValidation,
  registerValidation
} from '../databaseStorage/models/validation'

import { comparePassword, encryptPassword } from '../encoder/bcryptEncoder';
import { createToken } from '../token/jwt';

//ts types
import { Request, Response } from 'express';

export type RegisterUser = {
  confirmPassword: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export type LoginUser = {
  email: string;
  password: string;
}

export type UserDatabase = {
  confirmPassword: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  _id: string
}


export class Authenticate {
  //REGISTER USER
  public async createUser(req: Request, res: Response): Promise<Response> {
    const { error } = registerValidation(req.body);

    //Check if form has errors
    if (error) {
      const errorMessage: object = error.details.pop().message;
      return res.status(400).json({ error: errorMessage });
    }

    //Check if same users exists
    const emailExists = await dao.findOne({ email: req.body.email });
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
      confirmPassword: hashedConfirmPassword,
      password: hashedPassword,
    };

    try {
      const user = await dao.add(newUser);
      return res.status(200).json({
        message: `User with the id ${user._id} has been created`,
      });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  //LOGIN USER
  public async loginUser(req: Request, res: Response): Promise<Response> {
    const { error } = loginValidation(req.body);
    if (error) {
      const errorMessage: object = error.details.pop().message;
      return res.status(400).json({ error: errorMessage });
    }
    try {
      //Check if same users exists
      const user: UserDatabase = await dao.findOne({ email: req.body.email });
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

      const id: string = JSON.stringify(user._id);

      //Create and assign a token
      const token: string = await createToken({ id: id });
      await res.header('authToken', token);
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };
}
