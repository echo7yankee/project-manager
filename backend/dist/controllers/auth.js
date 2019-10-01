"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { userDao } = require("../databaseStorage/daos");
const dao = userDao;
const { registerValidation, loginValidation } = require("../databaseStorage/schemas/models/validation");
const { cryptPassword, comparePassword } = require("../encoder/bcryptEncoder");
const { createToken } = require("../token/jwt");
exports.createUser = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        const errorMessage = error.details.pop().message;
        return res.status(400).json({ error: errorMessage });
    }
    const emailExists = await dao.findOne({ email: req.body.email });
    if (emailExists)
        return res.status(400).json({ error: "Email already exists" });
    const { hashedPassword, hashedConfirmPassword } = await cryptPassword(req.body.password, req.body.confirmPassword);
    const newUser = Object.assign({}, req.body, { password: hashedPassword, confirmPassword: hashedConfirmPassword });
    try {
        const user = await dao.add(newUser);
        return res.status(200).json({
            message: `User with the id ${user._id} has been created`
        });
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};
exports.loginUser = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        const errorMessage = error.details.pop().message;
        return res.status(400).json({ error: errorMessage });
    }
    try {
        const user = await dao.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).json({ error: "Email or password is wrong" });
        const validPassword = await comparePassword(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).json({ error: "Email or password is wrong" });
        const token = await createToken({ _id: user._id });
        await res.header("authToken", token);
        return res.status(200).json({ token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};
//# sourceMappingURL=auth.js.map