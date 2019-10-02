
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
const app = express();

//parse json
app.use(express.json());

//config dotenv
dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log('Connection to mongodb has been established');
});

//import routes
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';

app.use('/user', authRouter);
app.use('/user', userRouter);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} is running`);
});
