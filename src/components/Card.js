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
  
      this._element.querySelector('.card__signature').textContent = this._name;
      this._element.querySelector('.card__element').src = this._link;
      this._element.querySelector('.card__element').alt = this._name;
  
      this._setEventListeners();
      
      return this._element;
    }

    _handleOpenClickPopup() {
      this._handleCardClick();
    }

    _handleDeleteCard() {
      this._element.remove();
    }

    _handleLikeCard() {
      this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }
  
    _setEventListeners() {
      // Открытие попапа по клику
      this._element.querySelector('.card__element').addEventListener('click', () => {
        this._handleOpenClickPopup();
      })
      
      // Удаление карточки
      this._element.querySelector('.card__delete').addEventListener('click', () => {
        this._handleDeleteCard();
      })
      // Лайки
      this._element.querySelector('.card__like').addEventListener('click', () => {
        this._handleLikeCard();
      })
    }  
  }