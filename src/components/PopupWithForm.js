import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(handleFormSubmit, selectorPopup) {
        super(selectorPopup)
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this.selectorPopup.querySelectorAll('.popup__input');
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        
    }

    close() {

    }
}