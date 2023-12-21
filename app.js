import express from 'express';
import cors from 'cors';
import moviesRouter from './routes/api/movies-router-decor.js';

export const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/movies", moviesRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found"
  })
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
})