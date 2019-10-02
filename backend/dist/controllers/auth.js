"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const daos_1 = require("../databaseStorage/daos");
const dao = daos_1.userDao;
const validation_1 = require("../databaseStorage/models/validation");
const bcryptEncoder_1 = require("../encoder/bcryptEncoder");
const jwt_1 = require("../token/jwt");
class Authenticate {
    async createUser(req, res) {
        const { error } = validation_1.registerValidation(req.body);
        if (error) {
            const errorMessage = error.details.pop().message;
            return res.status(400).json({ error: errorMessage });
        }
        const emailExists = await dao.findOne({ email: req.body.email });
        if (emailExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const { hashedPassword, hashedConfirmPassword } = await bcryptEncoder_1.encryptPassword(req.body.password, req.body.confirmPassword);
        const newUser = Object.assign({}, req.body, { confirmPassword: hashedConfirmPassword, password: hashedPassword });
        try {
            const user = await dao.add(newUser);
            return res.status(200).json({
                message: `User with the id ${user._id} has been created`,
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
    ;
    async loginUser(req, res) {
        const { error } = validation_1.loginValidation(req.body);
        if (error) {
            const errorMessage = error.details.pop().message;
            return res.status(400).json({ error: errorMessage });
        }
        try {
            const user = await dao.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ error: 'Email or password is wrong' });
            }
            const validPassword = await bcryptEncoder_1.comparePassword(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).json({ error: 'Email or password is wrong' });
            }
            const id = JSON.stringify(user._id);
            const token = await jwt_1.createToken({ id: id });
            await res.header('authToken', token);
            return res.status(200).json({ token });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }
    ;
}
exports.Authenticate = Authenticate;
//# sourceMappingURL=auth.js.map