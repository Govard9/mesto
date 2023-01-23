import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// Вынесем все необходимые элементы формы в константы
const formProfileEdit = document.querySelector('.popup__form');

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

// Элементы, куда должны быть вставлены значения полей
const profileAuthor = document.querySelector('.profile__author');
const profileProfession = document.querySelector('.profile__profession');

// Форма
const formElement = document.querySelector('.popup__main-container');
const nameInput = formElement.querySelector('.popup__input_data_name');
const jobInput = formElement.querySelector('.popup__input_data_profession');

// Кнопка добавления карт
const buttonAddCard = document.querySelector('.profile__add-button');

// все попапы
const popups = document.querySelectorAll('.popup');

// Попап карты
const popupProfileMod = document.querySelector('.popup_profile-popup');
const popupAddCardMod = document.querySelector('.popup_add-card');
const popupFullImageMod = document.querySelector('.popup_full-image');

// Инпуты формы добавления карт
const inputTitle = popupAddCardMod.querySelector('.popup__input_data_title');
const inputLinkImg = popupAddCardMod.querySelector('.popup__input_data_link-img');

// Кнопка сохранить
const buttonSaveInfoCard = popupAddCardMod.querySelector('.popup__main-container');

// Темплейт
const cardList = document.querySelector('.photos');

// изображение попапа
const popupImg = document.querySelector('.popup__img');
// текст картинки в фулл попапе
const popupTextFigure = document.querySelector('.popup__text-figure');

// Кнопка редактирования профиля
const buttonEditProfile = document.querySelector('.profile__edit-button');

// Закрытие popup
const buttonsClosePopup = document.querySelectorAll('.popup__close-button');

// функция для закрытия попапа по клику вне формы
export const closePopupOnClick = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');

  if (evt.target === popupOpened) {
    handleClosePopup(popupOpened);
  }
}

// функция для закрытия попапа по нажатия на клавишу Escape
export const closePopupOnEscape = (evt) => {

  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    handleClosePopup(popupOpened);
  }
}

export const handleOpenPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscape);
} 

export const handleClosePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscape);
}

export const handleFormSubmitEventAddCard = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const card = new Card({name: inputTitle.value, 
                        link: inputLinkImg.value}, '#new-card');
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
  evt.target.reset();
  handleClosePopup(popupAddCardMod);
}

export const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); 
  profileAuthor.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  handleClosePopup(popupProfileMod);
}

const handleClickPlus = () => {
  const formValidPlus = new FormValidator();
  formValidPlus.hideTheButton(popupAddCardMod, validationConfig);

  handleOpenPopup(popupAddCardMod);
}

const handleOpenProfilePopup = () => {
  nameInput.value = profileAuthor.textContent;
  jobInput.value = profileProfession.textContent;

  const formValidProfile = new FormValidator();
  formValidProfile.hideTheButton(popupProfileMod, validationConfig);

  handleOpenPopup(popupProfileMod);
}

// Закрытие попапа по крестику
buttonsClosePopup.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => handleClosePopup(popup));
});

// Обработчик нажатия на +
buttonAddCard.addEventListener('click', () => {
  handleClickPlus();
});

buttonSaveInfoCard.addEventListener('submit', handleFormSubmitEventAddCard);

// обработчик кнопки сохранения инфы для профиля
formProfileEdit.addEventListener('submit', (evt) => handleProfileFormSubmit(evt));

// обработчик открытия попапа профиля
buttonEditProfile.addEventListener('click', () => {
  handleOpenProfilePopup();
});

// обработчик всех попапов по клику
popups.forEach((elem) => {
  const popup = elem.closest('.popup');
  popup.addEventListener('click', (evt) => closePopupOnClick(evt, popup));
});

initialCards.forEach((item) => {
  const card = new Card(item, '#new-card');
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.photos').append(cardElement);
});

const formValidProfile = new FormValidator(validationConfig, popupProfileMod);
formValidProfile.enableValidation(validationConfig);

const formValidAddCard = new FormValidator(validationConfig, popupAddCardMod);
formValidAddCard.enableValidation(validationConfig);

export { popupFullImageMod, popupImg, popupTextFigure };