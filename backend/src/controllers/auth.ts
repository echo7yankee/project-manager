import {
  loginValidation,
  registerValidation
} from "../databaseStorage/models/validation";

import { comparePassword, encryptPassword } from "../encoder/bcryptEncoder";
import { createToken } from "../token/jwt";

//ts types
import { Request, Response } from "express";
import { RegisterUser, UserDatabase } from "../TSTypes/User";
import { UserDao } from "../databaseStorage/UserDao";

type TokenParams = {
  id: string;
  userRole: string;
};

export class Authenticate {
  userDao: UserDao;
  constructor(userDao) {
    this.userDao = userDao;
  }
  //REGISTER USER
  public createUser = async (req: Request, res: Response) => {
    const { error } = registerValidation(req.body);

    //Check if form has errors
    if (error) {
      const errorMessage: object = error.details.pop().message;
      return res.status(400).json({ error: errorMessage });
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
      confirmPassword: hashedConfirmPassword,
      password: hashedPassword
    };

    try {
      const user = await this.userDao.add(newUser);

      const tokenParams: TokenParams = { id: user._id, userRole: user.role };

      //Create and assign a token
      const token: string = await createToken({ params: tokenParams });
      await res.header("authToken", token);
      return res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  //LOGIN USER
  public loginUser = async (req: Request, res: Response) => {
    const { error } = loginValidation(req.body);
    if (error) {
      const errorMessage: object = error.details.pop().message;
      return res.status(400).json({ error: errorMessage });
    }
    try {
      //Check if same users exists
      const user: UserDatabase = await this.userDao.findOne({
        email: req.body.email
      });
      if (!user) {
        return res.status(400).json({ error: "Email or password is wrong" });
      }

      //Check if password is correct
      const validPassword: string = await comparePassword(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(400).json({ error: "Email or password is wrong" });
      }

      const tokenParams: TokenParams = { id: user._id, userRole: user.role };

      //Create and assign a token
      const token: string = await createToken({ params: tokenParams });
      await res.header("authToken", token);
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
}
