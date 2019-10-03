

//TS TYPES
import { ProjectDao } from '../databaseStorage/ProjectDao';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';

//ts types
import { ProjectReqBody } from '../TSTypes/Project';
import { UserDao } from '../databaseStorage/UserDao';

export class Project {
  private projectDao: ProjectDao;
  private userDao: UserDao;
  constructor(projectDao: ProjectDao, userDao: UserDao) {
    this.projectDao = projectDao;
    this.userDao = userDao;
  }
  public createProject = async (req: Request, res: Response): Promise<Response> => {
    try {

      const id: string = req.query.userId;
      const body: ProjectReqBody = req.body;

      const updatedProject = await this.projectDao.findAndUpdate(id, body)

      if (updatedProject === null) {
        const project = await this.projectDao.add(body);
        const user = await this.userDao.findById(id);
        const newUser = {
          ...user,
          projectId: project._id
        }

        await this.userDao.update(id, newUser)
        return res.status(200).json(project)
      }

      return res.status(200).json(updatedProject);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }
}

export class ProjectTask {
  private projectDao: ProjectDao;
  constructor(projectDao) {
    this.projectDao = projectDao
  }

  public createProjectTask = async (req, res) => {
    try {
      const { userId } = req.query;

      const project = await this.projectDao.findById(userId);
      const newProjectTasks = {
        ...req.body,
        projectId: project._id,
      }

      console.log('PROJECT TASKS', newProjectTasks);


      const updatedProject = {
        ...project,
        projectTasks: [...project.projectTasks, req.body]
      }
      console.log('Updated projects', updatedProject);

    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }
}