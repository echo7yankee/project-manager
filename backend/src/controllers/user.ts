
//ts types
//import { Role } from '../TSTypes/Role';
import { Request, Response } from 'express';
import { UserDatabase, UserDetails } from '../TSTypes/User';

// Daos
import { RoleDao } from '../databaseStorage/RoleDao';
import { UserDao } from '../databaseStorage/UserDao';

export class User {
    private userDao: UserDao;
    //private roleDao: RoleDao;
    constructor(userDao: UserDao, _roleDao: RoleDao) {
        this.userDao = userDao;
        //this.roleDao = roleDao;
    }
    public getUserDetails = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user: UserDatabase = await this.userDao.findById(id);
            //const role: Role = await this.roleDao.findById(user.role);

            const userDetails: UserDetails = {
                id: id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                createdAt: user.date,
            };
            return res.status(200).json(userDetails);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
}
