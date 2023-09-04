const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());
const { createUser, login } = require('./controllers/users');
const router = require('./routes/router');
const { createUserJoi, loginUserJoi } = require('./middlewares/JoiValidation');
const authMiddleware = require('./middlewares/auth');

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

app.post('/signin', loginUserJoi, login);
app.post('/signup', createUserJoi, createUser);
app.use(authMiddleware);

app.use(router);
app.use(errors({ message: 'Ошибка валидации Joi!' }));
app.listen(PORT, () => {
  console.log(`app listening to port ${PORT}`);
});
