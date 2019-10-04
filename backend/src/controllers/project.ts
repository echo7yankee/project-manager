
//TS TYPES
import { ProjectDao } from '../databaseStorage/ProjectDao';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';

//ts types
import { ProjectReqBody, IProject } from '../TSTypes/Project';

export class Project {
  private projectDao: ProjectDao;
  constructor(projectDao: ProjectDao) {
    this.projectDao = projectDao;
  }
  public createProject = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: string = req.query.userId;
      const body: ProjectReqBody = req.body;

      const newProject: IProject = {
        ...body,
        userId: id,
      };

      const project: IProject = await this.projectDao.add(newProject);
      return res.status(200).json(project);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public getProjects = async (req: Request, res: Response) => {
    try {
      const id: string = req.query.userId;
      const projects: IProject[] = await this.projectDao.find({ userId: id });
      return res.status(200).json(projects);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public removeProject = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const project: IProject = await this.projectDao.remove(id);

      if (project === null) {
        return res.status(404).json({ error: `Project with id ${id} does not exist` });
      }

      return res.status(200).json({ message: `Project with id ${id} has been removed from the collection` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  public updateProject = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const body: ProjectReqBody = req.body;

      const updatedProject: IProject = await this.projectDao.update(id, body);

      if (updatedProject === null) {
        return res.status(404).json({ error: `Project with id ${id} does not exist` });
      }
      return res.status(200).json(updatedProject);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

}
