import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(cors());

const PORT = 5000;
const MONGO_URI = 'mongodb://0.0.0.0:27017/test';

app.get('/', (req, res) => {
  res.status(202).send('<h1 style="text-align:center">My First Api</h1>');
});

app.get('/test', (req, res) => {
  res.status(202).json({ m: 'MongoDB', e: 'express', r: 'React', n: 'Nodejs' });
});

mongoose.set('strictQuery', true);
mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => app.listen(PORT, () => console.log(`server is running now in port ${PORT}`)),
);
