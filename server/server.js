import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { loggerMiddleware } from './middleware/logger.middleware.js';

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

app.route('/api/v1/auth');

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));
