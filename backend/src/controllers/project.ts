//TS TYPES
import { ProjectDao } from '../databaseStorage/ProjectDao';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';


//ts types
import { ProjectReqBody } from '../TSTypes/Project';

export class Project {
  private projectDao: ProjectDao;
  constructor(projectDao) {
    this.projectDao = projectDao;
  }
  public createProject = async (req: Request, res: Response) => {
    try {
      const id: string = req.query.userId;
      const body: ProjectReqBody = req.body;

      const newProject = {
        userId: id,
        ...body,
      };

      const createdProject = await this.projectDao.add(newProject);

      console.log(createdProject);

    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' })
    }
  };
}
