

//TS TYPES
import { ProjectDao } from '../databaseStorage/ProjectDao';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';

//ts types
import { ProjectReqBody } from '../TSTypes/Project';

export class Project {
  private projectDao: ProjectDao;
  constructor(projectDao: ProjectDao) {
    this.projectDao = projectDao;
  }
  public createProject = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: string = req.query.userId;
      const body: ProjectReqBody = req.body;

      const newProject = {
        ...body,
        userId: id
      }

      const project = await this.projectDao.add(newProject);
      return res.status(200).json(project);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public getProjects = async (req: Request, res: Response) => {
    try {
      const id: string = req.query.userId;
      const projects = await this.projectDao.find({ userId: id });
      return res.status(200).json(projects);
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