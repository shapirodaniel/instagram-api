const express = require('express');
const apiRouter = express.Router();
const usersRouter = require('./users');

module.exports = apiRouter;

apiRouter.get('/health', (req, res) => {
  res.send({ healthy: true });
});

apiRouter.use('/users', usersRouter);
