import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import roomRoutes from './routes/roomRoutes';
import { errorHandler } from './middleware/errorHandlerMiddleware';
import connectDB from './config/db';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/v2/auth', authRoutes);
app.use('/api/v1/rooms', roomRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
