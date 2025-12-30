import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { loggerMiddleware } from './middleware/logger.middleware.js';

import authRoutes from './routes/auth.routes.js';
import { contentRoutes } from './routes/content.route.js';

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

app.get('/', (req, res) => {
  res.json({ title: 'Hello World' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/content', contentRoutes);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));
