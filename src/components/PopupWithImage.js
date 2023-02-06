import { Popup } from './Popup';

export class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImg = this._popup.querySelector('.popup__img');
    this._popupText = this._popup.querySelector('.popup__text-figure');
  }

  open({ name, link }) {
    this._popupImg.alt = name;
    this._popupImg.src = link;
    this._popupText.textContent = name;
    super.open();
  }
}
