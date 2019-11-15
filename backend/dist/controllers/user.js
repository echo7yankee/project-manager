"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(userDao, _roleDao) {
        this.getUserDetails = async (req, res) => {
            try {
                const { id } = req.params;
                const user = await this.userDao.findById(id);
                const userDetails = {
                    id: id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
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
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map