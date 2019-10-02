
import { MongoClient } from '../databaseStorage/clients/MongoClient';
import { User } from './models/User';
import { UserDao } from './UserDao';

const userClient: MongoClient = new MongoClient(User);

export const userDao: UserDao = new UserDao(userClient);
