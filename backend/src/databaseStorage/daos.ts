
import { MongoClient } from '../databaseStorage/clients/MongoClient';

//Modles
import { Role } from './models/Role';
import { User } from './models/User';
import { Project } from './models/Project';
import { Task } from './models/Task';

//Daos
import { RoleDao } from './RoleDao';
import { UserDao } from './UserDao';
import { ProjectDao } from './ProjectDao';
import { TaskDao } from './TaskDao';

const userClient: MongoClient = new MongoClient(User);
const roleClient: MongoClient = new MongoClient(Role);
const projectClient: MongoClient = new MongoClient(Project);
const taskClient: MongoClient = new MongoClient(Task);

export const userDao: UserDao = new UserDao(userClient);
export const roleDao: RoleDao = new RoleDao(roleClient);
export const projectDao: ProjectDao = new ProjectDao(projectClient);
export const taskDao: TaskDao = new TaskDao(taskClient);
