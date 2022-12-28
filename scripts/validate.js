// Вынесем все необходимые элементы формы в константы
const formProfileEdit = document.querySelector('.popup__form');
const formInputProfile = formProfileEdit.querySelector('.popup__input_data_name');

const hideTheButton = (popupButton) => {
  const button = popupButton.querySelector('.popup__button');
  button.classList.add(validationConfig.inactiveButtonClass);
  button.disabled = true;
}

const hideInputError = (formElement, inputElement, config) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
}; 

const showInputError = (formElement, inputElement, config) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.valid) {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, config);
  } else {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, config);
  }
}; 

const hasInvalidInput = (inputList) => {
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
const toggleButtonState = (inputList, buttonElement, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}; 

const setEventListeners = (formElement, config) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config)
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем checkInputValidity,
        // передав ей форму и проверяемый элемент
        checkInputValidity(formElement, inputElement, config)
        toggleButtonState(inputList, buttonElement, config);
        });
    });
}; 

const enableValidation = (config) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement, config);
    });
  };