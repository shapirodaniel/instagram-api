const express = require('express');
const usersRouter = express.Router();
const { User } = require('../db/models');

module.exports = usersRouter;

usersRouter.post('/', async (req, res, next) => {
  try {
    // never use req.body directly!
    const { username, password } = req.body;

    // console.log({ username });
    // console.log('this is username, ', username)

    const user = await User.create({ username, password });

    res.send(user);
  } catch (err) {
    next(err);
  }
});
