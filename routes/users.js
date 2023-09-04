const usersRouter = require('express').Router();

const {
  getUsers, getUsersById, updateAvatar, updateUser, getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUsersById);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);
usersRouter.get('users/me', getCurrentUser);

module.exports = usersRouter;
