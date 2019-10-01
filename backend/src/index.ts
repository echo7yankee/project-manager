import { bar } from "./foo/bar";

console.log(bar("someValue"));

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//parse json
app.use(express.json());

//config dotenv
dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connection to mongodb has been established");
});

//import routes
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const locationRouter = require("./routes/location");
const roleRouter = require("./routes/role");
// const postsRoute = require("./routes/posts");

//Route Middlewares
app.use("/api/user", authRouter);
app.use("/api/user", userRouter);
app.use("/api/user", locationRouter);
app.use("/api/user", roleRouter);
// app.use("/api/posts", postsRoute);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} is running`);
});
