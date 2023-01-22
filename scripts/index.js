import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// массив с данными
const initialCards = [
  {
    name: 'Плотина',
    link: './images/bobrovaya_plotina.jpg'
  },
  {
    name: 'Домбай',
    link: './images/dombay.jpg'
  },
  {
    name: 'Эльбрус',
    link: './images/gora_elbrus.jpg'
  },
  {
    name: 'Церковь',
    link: './images/cerkov.jpg'
  },
  {
    name: 'Пастбища в Китае',
    link: './images/pastbishe_v_kitae.jpg'
  },
  {
    name: 'Пик Чукаш',
    link: './images/pik_chukash.jpg'
  }
]; 

initialCards.forEach((item) => {
  const card = new Card(item, '#new-card');
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.photos').append(cardElement);
});

const formValid = new FormValidator();
formValid.enableValidation(validationConfig);