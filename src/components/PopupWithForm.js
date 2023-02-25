import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor(selectorPopup, { handleFormSubmit }) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popupForm.querySelector('.popup__button');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
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

      // перед запросом сохраняем изначальный текст кнопки
      const initialText = this._submitButton.textContent;
      // меняем его, чтобы показать пользователю ожидание
      this._submitButton.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close()) // закрывается попап в `then`
        .finally(() => {
          this._submitButton.textContent = initialText;
        }); // в любом случае меняется текст кнопки обратно на начальный в `finally`
    });
  }
}
