export class Card {
    constructor({ item, handleCardClick }, templateSelector) {
      this._name = item.name;
      this._link = item.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
  
      return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._elementImg = this._element.querySelector('.card__element');
  
      this._element.querySelector('.card__signature').textContent = this._name;
      this._elementImg.src = this._link;
      this._elementImg.alt = this._name;
  
      this._setEventListeners();
      
      return this._element;
    }

    _handleOpenClickPopup() {
      this._handleCardClick();
    }

    _handleDeleteCard() {
      this._element.remove();
      this._element = null;
    }

    _handleLikeCard() {
      this._elementLike.classList.toggle('card__like_active');
    }
  
    _setEventListeners() {
      this._elementLike = this._element.querySelector('.card__like');
      // Открытие попапа по клику
      this._elementImg.addEventListener('click', () => {
        this._handleOpenClickPopup();
      })
      
      // Удаление карточки
      this._element.querySelector('.card__delete').addEventListener('click', () => {
        this._handleDeleteCard();
      })
      // Лайки
      this._elementLike.addEventListener('click', () => {
        this._handleLikeCard();
      })
    }  
  }