//TS TYPES
import { ProjectDao } from "../databaseStorage/ProjectDao";
import { UserDao } from "../databaseStorage/UserDao";

export class Project {
  projectDao: ProjectDao;
  userDao: UserDao;
  constructor(projectDao, userDao) {
    this.projectDao = projectDao;
    this.userDao = userDao;
  }
  public createProject = () => {};
}
