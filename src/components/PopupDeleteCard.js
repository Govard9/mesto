import { Popup } from './Popup';

export class PopupDeleteCard extends Popup {
  constructor(selectorPopup, handleCardDelete) {
    super(selectorPopup);
    this._formPopup = this._popup.querySelector('.popup__form');
    this._handleCardDelete = handleCardDelete;
  }

  open(cardId, cardDelete) {
    this._cardId = cardId;
    this._cardDelete = cardDelete;
    super.open();
  }

  setEventListeners() {
    this._formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleCardDelete(this._cardId, this._cardDelete);
    });
    super.setEventListeners();
  }
}
