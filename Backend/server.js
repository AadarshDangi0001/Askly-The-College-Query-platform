import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/db/db.js';
import setupSocketServer from './src/socket/socket.service.js';
import http from 'http';
import { startBot } from './src/bot/controller.bot.js';
import cors from 'cors';

// Allow requests from frontend domain
app.use(cors({
  origin: 'https://askly-the-college-query-platform.vercel.app',
  credentials: true
}));

const httpServer = http.createServer(app);
connectDB();
setupSocketServer(httpServer);

// startBot();

httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});