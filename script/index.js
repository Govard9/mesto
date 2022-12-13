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
    link: './images/karachaevsk.jpg'
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
const photo = document.querySelector('.photo');
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
  cloneCard.querySelector('.card__element').src = link;
  cloneCard.querySelector('.card__element').alt = name;
  cloneCard.querySelector('.card__signature').textContent = name;

  cloneCard.querySelector('.card__delete').addEventListener('click', () => {
    cloneCard.remove();
  })

  cloneCard.querySelector('.card__like').addEventListener('click', () => {
    cloneCard.querySelector('.card__like').classList.add('card__like_active')
  })
  
  cloneCard.querySelector('.card__element').addEventListener('click', () => {
    popupImg.src = cloneCard.querySelector('.card__element').src;
    popupImg.alt = cloneCard.querySelector('.card__signature').textContent;
    popupTextFigure.textContent = cloneCard.querySelector('.card__signature').textContent;
    openPopup(popupFullImageMod);
  })

  return cloneCard;
}

function renderCard(name, link) {
  photo.append(createCard(name, link));
}

initialCards.forEach(nameCard => {
  renderCard(nameCard.name, nameCard.link)
})

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileAuthor.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupProfileMod);
}

function handleformElementMainContainer(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  photo.prepend(createCard(inputTitle.value, inputLinkImg.value))
  evt.target.reset()
  closePopup(popupAddCardMod);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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