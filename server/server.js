import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ title: 'Hello World' });
});

app.route('/api/v1/auth');

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));
