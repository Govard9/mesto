import { Popup } from './Popup';

export class PopupYouSure extends Popup {
  constructor(selectorPopup, { popupDeleteButton }) {
    super(selectorPopup);
    this._popupDeleteButton = popupDeleteButton;
    this._delete = this._delete.bind(this);
  }

  _delete(cardId) {
    this._popupDeleteButton(cardId);
    document.querySelector(`[data-id="${cardId}"]`).remove();
    super.close();
  }

  setEventListeners(cardId) {
    super.open();
    this._popup
      .querySelector('.popup__button')
      .addEventListener('click', () => {
        this._delete(cardId);
      });
  }
}
