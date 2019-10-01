"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bar_1 = require("./foo/bar");
console.log(bar_1.bar("someValue"));
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
app.use(express.json());
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connection to mongodb has been established");
});
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const locationRouter = require("./routes/location");
const roleRouter = require("./routes/role");
app.use("/api/user", authRouter);
app.use("/api/user", userRouter);
app.use("/api/user", locationRouter);
app.use("/api/user", roleRouter);
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} is running`);
});
//# sourceMappingURL=index.js.map