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

// Ппопап карты
const popupProfileMod = document.querySelector('.popup_profile-popup');
const popupAddCardMod = document.querySelector('.popup_add-card');
const popupFullImageMod = document.querySelector('.popup_full-image');

// Кнопка сохранить
const buttonSaveInfoCard = popupAddCardMod.querySelector('.popup__main-container');
const titleInputAddCard = buttonSaveInfoCard.querySelector('.popup__input_data_title');
const linkInputAddCard = buttonSaveInfoCard.querySelector('.popup__input_data_link-img');

// Темплейт
const photo = document.querySelector('.photo');
const clonePhoto = document.querySelector('#new-card').content;

// изображение попапа
const popupImg = document.querySelector('.popup__img');
// текст картинки в фулл попапе
const popupTextFigure = document.querySelector('.popup__text-figure');

// Кнопка редактирования профиля
const buttonEditProfile = document.querySelector('.profile__edit-button');

// Все попапы
const popups = document.querySelectorAll('.popup');

// Закрытие popup
const buttonsClosePopup = document.querySelectorAll('.popup__close-button');

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileAuthor.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupProfileMod);
}

function loadingAllCards() {
  initialCards.forEach(elem => {
    const cloneCard = clonePhoto.querySelector('.card').cloneNode(true);
    cloneCard.querySelector('.card__element').src = elem.link;
    cloneCard.querySelector('.card__element').alt = elem.name;
    cloneCard.querySelector('.card__signature').textContent = elem.name;

    photo.append(cloneCard); 

    // Лайки
    cloneCard.querySelectorAll('.card__like').forEach(elem => {
      elem.addEventListener('click', () => {
        elem.classList.add('card__like_active');
      })
    });

    // Удаление карты
    cloneCard.querySelectorAll('.card__delete').forEach(elem => {
      elem.addEventListener('click', () => {
        cloneCard.remove();
      })
    })

    cloneCard.querySelectorAll('.card__element').forEach((elem) => {
      elem.addEventListener('click', () => {
        popupImg.src = elem.src;
        popupTextFigure.textContent = document.querySelector('.card__signature').textContent;
        popupFullImageMod.classList.add('popup_opened');
      })
    });
  })
}

function createCard(item) {
  // Клон карточек
  item.querySelector('.card__element').src = linkInputAddCard.value;
  item.querySelector('.card__element').alt = titleInputAddCard.value;
  item.querySelector('.card__signature').textContent = titleInputAddCard.value;

  item.querySelector('.card__delete').addEventListener('click', () => {
      item.remove();
    })

  item.querySelector('.card__like').addEventListener('click', () => {
    item.querySelector('.card__like').classList.add('card__like_active');
    })

  item.querySelectorAll('.card__element').forEach((elem) => {
    elem.addEventListener('click', () => {
      popupImg.src = elem.src;
      popupTextFigure.textContent = document.querySelector('.card__signature').textContent;
      popupFullImageMod.classList.add('popup_opened');
    })
  });
  return item;
}

function openPopup(popup) {
  nameInput.value = profileAuthor.textContent;
  jobInput.value = profileProfession.textContent;
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleformElementMainContainer(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Клон карточек
  const cloneCard = clonePhoto.querySelector('.card').cloneNode(true);
  createCard(cloneCard)
  photo.prepend(cloneCard);
  evt.target.reset()
  closePopup(popupAddCardMod);
}

// обработчик кнопки сохранения инфы для профиля
formElement.addEventListener('submit', handleFormSubmit);

// Обработчик для сохранение новой карты с разными функциями
buttonSaveInfoCard.addEventListener('submit', handleformElementMainContainer);

// обработчик открытия попапа
buttonEditProfile.addEventListener('click', () => openPopup(popupProfileMod));
buttonAddCard.addEventListener('click', () => openPopup(popupAddCardMod));
// обработчик закрытия попапа
popups.forEach(popup => {
  buttonsClosePopup.forEach(btn => {
    btn.addEventListener('click', () => closePopup(popup))
  })
})

// Перебор массива и добавления картинок и имён карточек при загрузке страницы
loadingAllCards()