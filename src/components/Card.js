export class Card {
  constructor(
    {
      item,
      handleCardClick,
      handleCardDelete,
      handleLiked,
      handleLikedDelete,
      userId,
    },
    templateSelector
  ) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._cardId = item;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._handleCardDelete = handleCardDelete;
    this._handleLiked = handleLiked;
    this._handleLikedDelete = handleLikedDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    
    if (this._cardId.owner._id !== this._userId) {
      this._element.querySelector('.card__delete').remove();
    }

    if (this._cardId.owner._id === this._userId) {
      this._element.setAttribute('data-id', this._cardId._id);
    }

    this._elementImg = this._element.querySelector('.card__element');
    this._elementLikeCount = this._element.querySelector('.card__like-count');

    this._element.querySelector('.card__signature').textContent = this._name;
    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;

    this._likes.forEach((elem) => {
      if (elem._id === this._userId) {
        this._element
          .querySelector('.card__like')
          .classList.toggle('card__like_active');
      }
    });

    this._elementLikeCount.textContent =
      this._likes.length;

    this._setEventListeners();

    return this._element;
  }

  _handleOpenClickPopup() {
    this._handleCardClick();
  }

  _handleDeleteCard(cardId, elementCard) {
    this._handleCardDelete(cardId, elementCard);
  }

  _handleLikeCard() {
    this._handleLiked(this._cardId._id).then((res) => {
      if (this._elementLike.classList.toggle('card__like_active')) {
        this._elementLikeCount.textContent =
          res.likes.length;
      } else {
        this._handleLikedDelete(this._cardId._id).then((res) => {
          this._elementLikeCount.textContent =
            res.likes.length;
        });
      }
    });
  }

  _setEventListeners() {
    this._elementLike = this._element.querySelector('.card__like');

    // Открытие попапа по клику
    this._elementImg.addEventListener('click', () => {
      this._handleOpenClickPopup();
    });

    if (this._cardId.owner._id === this._userId) {
      // Удаление карточки
      this._element
        .querySelector('.card__delete')
        .addEventListener('click', () => {
          this._handleDeleteCard(this._cardId._id, this._element);
        });
    }

    // Лайки
    this._elementLike.addEventListener('click', () => {
      this._handleLikeCard();
    });
  }
}
