const usersRouter = require('express').Router();

const {
  getUsers, getUsersById, updateAvatar, updateUser, getCurrentUser,
} = require('../controllers/users');
const { getUserByIdJoi, updateAvatarJoi, updateUserJoi } = require('../middlewares/JoiValidation');

usersRouter.get('', getUsers);
usersRouter.get('/:userId', getUserByIdJoi, getUsersById);
usersRouter.patch('/me', updateUserJoi, updateUser);
usersRouter.patch('/me/avatar', updateAvatarJoi, updateAvatar);
usersRouter.get('/me', getCurrentUser);

module.exports = usersRouter;
