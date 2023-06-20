const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();
const router = require('./routes/router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  req.user = {
    _id: '648d53420f96ead783d9da50',
  };
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`app listening to port ${PORT}`);
});
