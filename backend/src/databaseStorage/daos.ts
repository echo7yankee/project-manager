
import { MongoClient } from '../databaseStorage/clients/MongoClient';

//Modles
import { Role } from './models/Role';
import { User } from './models/User';
import { Project } from './models/Project';
//Daos
import { RoleDao } from './RoleDao';
import { UserDao } from './UserDao';
import { ProjectDao } from './ProjectDao';

const userClient: MongoClient = new MongoClient(User);
const roleClient: MongoClient = new MongoClient(Role);
const projectClient: MongoClient = new MongoClient(Project);

export const userDao: UserDao = new UserDao(userClient);
export const roleDao: RoleDao = new RoleDao(roleClient);
export const projectDao: ProjectDao = new ProjectDao(projectClient);
