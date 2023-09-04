const jwt = require('jsonwebtoken');
const { ERROR_UNAUTHORISED } = require('../errors/errors');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(ERROR_UNAUTHORISED).send({ message: 'Некорректный токен' });
  }
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    res.status(ERROR_UNAUTHORISED).send({ message: 'Токен не верифицирован' });
  }

  req.user = payload;
  return next();
};
