

//TS TYPES
import { ProjectDao } from '../databaseStorage/ProjectDao';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';

//ts types
import { ProjectReqBody, IProject } from '../TSTypes/Project';
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

      const newProject: IProject = {
        userId: id,
        ...body,
      };
      const createdProject = await this.projectDao.add(newProject);

      const user = await this.userDao.findById(id)
      const newUser = {
        ...user._doc,
        projectId: [createdProject._id],
      }
      console.log('what is wrong with newuser?', newUser);

      await this.userDao.update(id, newUser)
      return res.status(201).json(createdProject);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public removeProject = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: string = req.params.projectId;

      await this.projectDao.remove(id);

      return res.status(200).json({ message: `Product with the id ${id} has been removed from collection` });
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public editProject = async (req: Request, res: Response): Promise<Response> => {
    try {
      console.log(req.body);

      const id: string = req.params.projectId;
      const editedProject = await this.projectDao.update(id, req.body);

      return res.status(200).json(editedProject);
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public getProjects = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const projects = await this.projectDao.find({});

      return res.status(200).json(projects);
    } catch (error) {
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