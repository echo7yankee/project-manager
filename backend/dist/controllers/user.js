"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(userDao, roleDao) {
        this.getUserDetails = async (req, res) => {
            try {
                const { id } = req.params;
                const user = await this.userDao.findById(id);
                const role = await this.roleDao.findById(user.role);
                const userDetails = {
                    id: id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: role.role,
                    createdAt: user.date,
                };
                return res.status(200).json(userDetails);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.userDao = userDao;
        this.roleDao = roleDao;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map