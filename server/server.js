import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { loggerMiddleware } from './middleware/logger.middleware.js';

import authRoutes from './routes/auth.routes.js';
import { contentRoutes } from './routes/content.route.js';
import { userRoutes } from './routes/user-management.routes.js';
import { errorHandler } from './middleware/error-handler.middleware.js';
import { reportRoutes } from './routes/report.route.js';
import { leaderboardRoutes } from './routes/leaderboard.route.js';
import { policyRoutes } from './routes/policy.route.js';

const app = express();
app.use(
  cors({
    origin: '*',
    credentials: false,
  })
);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.get('/api/v1', (req, res) => {
  res.json({ title: 'Hello from DKN System API' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/content', contentRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/leaderboard', leaderboardRoutes);
app.use('/api/v1/policy', policyRoutes);

app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));
