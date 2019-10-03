"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
app.use(express_1.default.json());
dotenv_1.default.config();
mongoose_1.default.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log('Connection to mongodb has been established');
});
const auth_1 = require("./routes/auth");
const user_1 = require("./routes/user");
const project_1 = require("./routes/project");
app.use('/user', auth_1.authRouter);
app.use('/user', user_1.userRouter);
app.use('/', project_1.projectRouter);
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} is running`);
});
//# sourceMappingURL=index.js.map