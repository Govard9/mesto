export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Элементы, куда должны быть вставлены значения полей
export const profileAuthor = document.querySelector('.profile__author');
export const profileProfession = document.querySelector('.profile__profession');

// Форма
export const mainContainer = document.querySelector('.popup__main-container');
export const nameInput = mainContainer.querySelector('.popup__input_data_name');
export const jobInput = mainContainer.querySelector(
  '.popup__input_data_profession'
);

// Кнопка добавления карт
export const buttonAddCard = document.querySelector('.profile__add-button');

// Попап карты
export const popupProfileMod = document.querySelector('.popup_profile-popup');
export const popupAddCardMod = document.querySelector('.popup_add-card');

// Кнопка редактирования профиля
export const buttonEditProfile = document.querySelector(
  '.profile__edit-button'
);
