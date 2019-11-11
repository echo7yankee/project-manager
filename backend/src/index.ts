
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();

//user cors
app.use(cors());

//parse json
app.use(express.json());

//config dotenv
dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useFindAndModify: false }, () => {
  console.log('Connection to mongodb has been established');
});

//import routes
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { projectRouter } from './routes/project';
import { taskRouter } from './routes/task';

app.use('/user', authRouter);
app.use('/user', userRouter);
app.use('/', projectRouter)
app.use('/', taskRouter)

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} is running`);
});
