export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

_hideInputError = (inputElement) => {
  // Находим элемент ошибки
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(this._inputErrorClass);
}; 

_showInputError = (inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  errorElement.classList.add(this._errorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(this._inputErrorClass);
};

// Функция, которая проверяет валидность поля
_checkInputValidity = (inputElement) => {
  if (inputElement.validity.valid) {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    this._hideInputError(inputElement);
  } else {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    this._showInputError(inputElement, inputElement.validationMessage);
  }
}; 

_hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
}; 

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
_toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (this._hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

resetValidation = () => {  
  this._buttonElement.classList.add(this._inactiveButtonClass);
  this._buttonElement.disabled = true;

  this._inputList.forEach((inputElement) => {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
  })
}

_setEventListeners = () => {
    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем checkInputValidity,
        // передав ей форму и проверяемый элемент
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
}; 

enableValidation = () => {
    this._setEventListeners();
  };
  
}