const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const indexRoutes = require('./routes/indexRoute');

const app = express();
const port = process.env.PORT || 3000;

// DB Connection
mongoose
  .connect(
    'mongodb+srv://firstwongsrila:wongbel2000@hva.9zshyav.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log('DB connected successful'))
  .catch((err) => console.log(err));

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('body-parser').json());

// Routes
app.use('/', indexRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
