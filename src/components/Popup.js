export class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._button = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOverlay = this._handleClickOverlay.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickOverlay(evt) {
    if (evt.target == this._popup) {
      this.close();
    }
  }

  setEventListeners() {
    this._button.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', this._handleClickOverlay);
  }
}
