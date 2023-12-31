const Card = require('../models/card');
const {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  ERROR_FORBIDDEN,
} = require('../errors/errors');

module.exports.getCards = (req, res) => {
  Card.find({}).populate(['owner', 'likes'])
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(ERROR_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Неверный формат данных карточки' });
      }
      return res.status(ERROR_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (String(card.owner) !== String(req.user._id)) {
        return res.status(ERROR_FORBIDDEN).send({ message: 'Недостаточно прав для удаления карточки' });
      }
      return card.deleteOne();
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Неверный формат данных карточки' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с таким id не найдена' });
      }
      return res.status(ERROR_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с таким id не найдена' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Неверный формат данных карточки' });
        return;
      }
      res.status(ERROR_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с таким id не найдена' });
      }

      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Неверный формат данных карточки' });
        return;
      }
      res.status(ERROR_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};
