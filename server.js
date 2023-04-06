const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// DB Connection
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected successful'))
  .catch((err) => console.log(err));

// Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

let setCache = function (req, res, next) {
  // here you can define period in second, this one is 5 minutes
  const period = 365 * 24 * 60 * 60;
  // you only want to cache for GET requests
  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=${period}`);
  } else {
    // for the other requests set strict no caching parameters
    res.set('Cache-control', `no-store`);
  }
  next();
};

app.use(setCache);

// Middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}/`),
);
