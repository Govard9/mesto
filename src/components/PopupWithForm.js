import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(selectorPopup, { handleFormSubmit }) {
        super(selectorPopup)
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._selectorPopup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = this._selectorPopup.querySelectorAll('.popup__input');
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    close() {
        super.close();
        
        this._popupForm.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();

            // добавим вызов функции _handleFormSubmit
            // передадим ей объект — результат работы _getInputValues
            this._handleFormSubmit(this._getInputValues());
            this.close(evt)
        });
    }
}