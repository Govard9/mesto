import { FormValidator } from "./FormValidator.js";

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

export class Card {
    constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
  
      return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate();
  
      this._element.querySelector('.card__signature').textContent = this._name;
      this._element.querySelector('.card__element').src = this._link;
  
      this._setEventListeners();
      
      return this._element;
    }

    // функция для закрытия попапа по клику вне формы
    _closePopupOnClick = (evt) => {
      const popupOpened = document.querySelector('.popup_opened');

      if (evt.target === popupOpened) {
        this._handleClosePopup(popupOpened);
      }
    }

    // функция для закрытия попапа по нажатия на клавишу Escape
    _closePopupOnEscape = (evt) => {

      if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        this._handleClosePopup(popupOpened);
      }
    }
  
    _handleOpenPopup(popup) {
      popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._closePopupOnEscape);
    } 
  
    _handleClosePopup(popup) {
      popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._closePopupOnEscape);
    }
  
    _handleFormSubmitEventAddCard(evt) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
      const card = new Card({name: inputTitle.value, 
                            link: inputLinkImg.value}, '#new-card');
      const cardElement = card.generateCard();
      cardList.prepend(cardElement);
      evt.target.reset();
      card._handleClosePopup(popupAddCardMod);
    }
  
    _handleProfileFormSubmit(evt) {
      evt.preventDefault(); 
      profileAuthor.textContent = nameInput.value;
      profileProfession.textContent = jobInput.value;
      this._handleClosePopup(popupProfileMod);
    }
  
    _setEventListeners() {
      // Открытие попапа по клику
      this._element.querySelector('.card__element').addEventListener('click', () => {
        popupImg.alt = this._name;
        popupImg.src = this._link;
        popupTextFigure.textContent = this._name;
        this._handleOpenPopup(popupFullImageMod);
      })
      
      // Закрытие попапа по крестику
      buttonsClosePopup.forEach((button) => {
        // находим 1 раз ближайший к крестику попап 
        const popup = button.closest('.popup');
        // устанавливаем обработчик закрытия на крестик
        button.addEventListener('click', () => this._handleClosePopup(popup));
      });
      // Удаление карточки
      this._element.querySelector('.card__delete').addEventListener('click', () => {
        this._element.remove();
      })
      // Лайки
      this._element.querySelector('.card__like').addEventListener('click', () => {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
      })
  
      // Обработчик нажатия на +
      buttonAddCard.addEventListener('click', () => {
        const formValidPlus = new FormValidator();
        formValidPlus._hideTheButton(popupAddCardMod);

        this._handleOpenPopup(popupAddCardMod);
      });
  
      buttonSaveInfoCard.addEventListener('submit', this._handleFormSubmitEventAddCard);
  
      // обработчик кнопки сохранения инфы для профиля
      formElement.addEventListener('submit', (evt) => this._handleProfileFormSubmit(evt));
  
      // обработчик открытия попапа профиля
      buttonEditProfile.addEventListener('click', () => {
        nameInput.value = profileAuthor.textContent;
        jobInput.value = profileProfession.textContent;
  
        const formValidProfile = new FormValidator();
        formValidProfile._hideTheButton(popupProfileMod);

        this._handleOpenPopup(popupProfileMod);
      });

      // обработчик всех попапов по клику
      popups.forEach((elem) => {
        const popup = elem.closest('.popup');
        popup.addEventListener('click', (evt) => this._closePopupOnClick(evt, popup));
      });
    }  
  }