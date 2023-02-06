import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import initialCards from '../components/cards.js'
import './index.css'; // добавьте импорт главного файла стилей
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

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

// Темплейт
const cardList = document.querySelector('.photos');

// изображение попапа
const popupImg = document.querySelector('.popup__img');
// текст картинки в фулл попапе
const popupTextFigure = document.querySelector('.popup__text-figure');

// Кнопка редактирования профиля
const buttonEditProfile = document.querySelector('.profile__edit-button');

// функция для закрытия попапа по клику вне формы
export const closePopupOnClick = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');

  if (evt.target === popupOpened) {
    const popup = new Popup('.popup_opened');
    popup.close();
  }
}

// Отправляет разметку в класс Section
const cardsListSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({ item: item,
      handleCardClick: () => {
        const popupWithImage = new PopupWithImage('.popup_full-image');
        popupWithImage.open({ name: item.name, link: item.link });
      }
    },
      '#new-card');
    const cardElement = card.generateCard();
    cardsListSection.addItem(cardElement);
  }
}, ".photos");
cardsListSection.renderItems();

const handleOpenAddCard = () => {
  inputTitle.value = '';
  inputLinkImg.value = '';
  
  formValidAddCard.resetValidation();
  
  // Добавление карт на сайт
  const form = new PopupWithForm('.popup_add-card', {
    // объект, который мы передадим при вызове handleFormSubmit
    // окажется на месте параметра formData
    handleFormSubmit: (formData) => {
      const card = new Card({ item: formData,
        handleCardClick: () => {
          const popupWithImage = new PopupWithImage('.popup_full-image');
          popupWithImage.open({ name: formData.name, link: formData.link });
        }
      },
        '#new-card');
      const cardElement = card.generateCard();
      cardList.prepend(cardElement);
    }
  }); 
  form.open();
}

// изменения в профиле пользователя
const handleOpenProfilePopup = () => {
  const userInfo = new UserInfo({
    profileAuthor, profileProfession
  });
  const getUserInfo = userInfo.getUserInfo()
  nameInput.value = getUserInfo.getName;
  jobInput.value = getUserInfo.getProfession;

  const form = new PopupWithForm('.popup_profile-popup', {
    // объект, который мы передадим при вызове handleFormSubmit
    // окажется на месте параметра formData
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData.firstname, formData.profession)
    }
  }); 
  form.open();
}

// Обработчик нажатия на +
buttonAddCard.addEventListener('click', () => {
  handleOpenAddCard();
});

// обработчик открытия попапа профиля
buttonEditProfile.addEventListener('click', (evt) => {
  handleOpenProfilePopup(evt);
});

// обработчик всех попапов по клику
popups.forEach((elem) => {
  const popup = elem.closest('.popup');
  popup.addEventListener('click', (evt) => closePopupOnClick(evt));
});

const formValidProfile = new FormValidator(validationConfig, popupProfileMod);
formValidProfile.enableValidation();

const formValidAddCard = new FormValidator(validationConfig, popupAddCardMod);
formValidAddCard.enableValidation();

export { popupFullImageMod, popupImg, popupTextFigure };