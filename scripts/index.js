const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  activeButtonClass: 'popup__button_active',
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

// Кнопка сохранить
const buttonSaveInfoCard = popupAddCardMod.querySelector('.popup__main-container');

// Темплейт
const cardList = document.querySelector('.photos');
const clonePhoto = document.querySelector('#new-card').content;

// изображение попапа
const popupImg = document.querySelector('.popup__img');
// текст картинки в фулл попапе
const popupTextFigure = document.querySelector('.popup__text-figure');

// Кнопка редактирования профиля
const buttonEditProfile = document.querySelector('.profile__edit-button');

// Закрытие popup
const buttonsClosePopup = document.querySelectorAll('.popup__close-button');

function createCard(name, link) {
  const cloneCard = clonePhoto.querySelector('.card').cloneNode(true);
  const cardElement = cloneCard.querySelector('.card__element');
  const cardSignature = cloneCard.querySelector('.card__signature');
  const cardLike = cloneCard.querySelector('.card__like');

  cardElement.src = link;
  cardElement.alt = name;
  cardSignature.textContent = name;

  cloneCard.querySelector('.card__delete').addEventListener('click', () => {
    cloneCard.remove();
  })

  cardLike.addEventListener('click', () => {
    cardLike.classList.toggle('card__like_active')
  })
  
  cardElement.addEventListener('click', () => {
    popupImg.src = link;
    popupImg.alt = name;
    popupTextFigure.textContent = cardSignature.textContent;
    openPopup(popupFullImageMod);
  })

  return cloneCard;
}

function renderCard(initialCards) {
  initialCards.forEach(nameCard => {
    cardList.append(createCard(nameCard.name, nameCard.link));
  })
}

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileAuthor.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupProfileMod);
}

function handleformElementMainContainer(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  cardList.prepend(createCard(inputTitle.value, inputLinkImg.value));
  evt.target.reset();
  closePopup(popupAddCardMod);
}

function openPopup(popup) {
  const popupButton = popup.querySelector('.popup__button');

  popup.classList.add('popup_opened');
  if (popupButton) {
    popupButton.classList.remove(validationConfig.activeButtonClass);
    popupButton.classList.add(validationConfig.inactiveButtonClass);
  }
  
  document.addEventListener('keydown', (evt) => closePopupOnEscape(evt, popup));
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// функция для закрытия попапа по клику вне формы
function closePopupOnClick(evt, popup) {
  if (evt.target === popup) {
    closePopup(popup);
  }
}

// функция для закрытия попапа по нажатия на клавишу Escape
function closePopupOnEscape(evt, popup) {
  if (evt.key === 'Escape') {
    document.removeEventListener('keydown', (evt) => closePopupOnEscape(evt, popup));
    closePopup(popup);
  }
}

// обработчик кнопки сохранения инфы для профиля
formElement.addEventListener('submit', handleFormSubmit);

// Обработчик для сохранение новой карты с разными функциями
buttonSaveInfoCard.addEventListener('submit', handleformElementMainContainer);

// обработчик открытия попапа профиля
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileAuthor.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(popupProfileMod)
});
buttonAddCard.addEventListener('click', () => openPopup(popupAddCardMod));

// Крестик попапов
buttonsClosePopup.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// обработчик всех попапов по клику
popups.forEach((elem) => {
  const popup = elem.closest('.popup');
  popup.addEventListener('click', (evt) => closePopupOnClick(evt, popup));
});

renderCard(initialCards);
enableValidation(validationConfig);