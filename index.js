const express = require('express');
const app = express();
const PORT = process.env.PORT || 5500;

// logging
/* logging middleware goes here */

// parsing
app.use(express.json()); // parsing JSON
app.use(express.urlencoded({ extended: false })); // parsing x-www-urlencoded, from forms

// api
const apiRouter = require('./routes');
app.use('/api', apiRouter);

// everything else
app.listen(PORT, () => {
  console.log(`express server running on port ${PORT}`);
});
