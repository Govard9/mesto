export class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup;
        this._button = selectorPopup.querySelector('.popup__close-button');
    }

    open() {
        this._selectorPopup.classList.add('popup_opened');
    }

    close() {
        this._selectorPopup.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._button.addEventListener('click', () => this.close());
        
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    }
}