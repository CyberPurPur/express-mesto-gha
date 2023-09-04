const cardRouter = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { createCardJoi, checkCardIdJoi } = require('../middlewares/JoiValidation');

cardRouter.get('/', getCards);
cardRouter.post('/', createCardJoi, createCard);
cardRouter.delete('/:cardId', checkCardIdJoi, deleteCard);
cardRouter.put('/:cardId/likes', checkCardIdJoi, likeCard);
cardRouter.delete('/:cardId/likes', checkCardIdJoi, dislikeCard);

module.exports = cardRouter;
