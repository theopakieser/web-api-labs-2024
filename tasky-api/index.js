import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import tasksRouter from './api/tasks';
import usersRouter from './api/users';
import './db'; // Ensure your database connection is established

dotenv.config();

const errHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message,
      details: err.errors, // Detailed error information from Mongoose
    });
  }

  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send('Something went wrong!');
  }

  res.status(500).send(`Hey!! You caught the error. Here's the details: ${err.stack}`);
};

const app = express();
const port = process.env.PORT;

if (!port) {
  console.error('PORT is not defined in .env file');
  process.exit(1);
}

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON

app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);

app.use(errHandler); // Error handler goes after all routes

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
