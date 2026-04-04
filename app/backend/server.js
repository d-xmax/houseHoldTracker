import dotenv from 'dotenv';
import cors from 'cors';
import express, { urlencoded } from 'express';
import userRoutes from './routes/userRoutes.js';
import listRoutes from './routes/listRoutes.js';
import {
  itemRouter,
  itemParamRouter,
} from './routes/itemRoutes.js';
import { connectDB } from './config/config.js';
import errorHandler from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
// import path from 'path';

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/list', listRoutes);
app.use('/api/:listId', itemParamRouter);
app.use('/api/item', itemRouter);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on ${port} `);
});
