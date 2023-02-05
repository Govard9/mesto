export class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = document.querySelector(selectorPopup);
        this._button = this._selectorPopup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._selectorPopup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this.setEventListeners()
    }

    close() {
        this._selectorPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._button.addEventListener('click', () => this.close());
    }
}