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

// Открытие popup
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup');

// Форма
const formElement = document.querySelector('.popup__main-container');
const nameInput = formElement.querySelector('.popup__input_data_name');
const jobInput = formElement.querySelector('.popup__input_data_profession');

// Добавление массива с инфой в карточки
const cardsImg = document.querySelectorAll('.card__element');
const cardsName = document.querySelectorAll('.card__signature')

// Закрытие popup
const buttonClosePopup = document.querySelector('.popup__close-button');

// Открытие попап карт
const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-add')

// Выберите элементы, куда должны быть вставлены значения полей в popup-add
const cardSignature = document.querySelector('.card__signature');
const cardElement = document.querySelector('.card__element');

// Закрытие popup-add
const buttonClosePopupAdd = popupAddCard.querySelector('.popup-add__close-button');

// Кнопка сохранить
const buttonSaveInfoCard = popupAddCard.querySelector('.popup-add__main-container');
const titleInputAddCard = buttonSaveInfoCard.querySelector('.popup-add__input_data_title');
const linkInputAddCard = buttonSaveInfoCard.querySelector('.popup-add__input_data_link-img');

// Кнопка удаления карточек
const cards = document.querySelectorAll('.card');
const btnDelete = document.querySelectorAll('.card__delete');

// Лайки для карточек
const like = document.querySelectorAll('.card__like');

// Клон карт из темплейта
const photo = document.querySelector('.photo');
const clonePhoto = document.querySelector('#new-card').content;

// Закрытие полной картинки в попапе
const closeBtnFull = document.querySelector('.popup-full__close-button');

function openPopupEditProfile() {
  nameInput.value = profileAuthor.textContent;
  jobInput.value = profileProfession.textContent;
  popupEditProfile.classList.add('popup_opened');
}

function closePopup() {
  popupEditProfile.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileAuthor.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup()
}

function openPopupAddCard() {
  popupAddCard.classList.add('popup-add_opened');
}

function closePopupAddCard() {
  popupAddCard.classList.remove('popup-add_opened');
}

function pageLoad() {
  cardsImg.forEach((elem, index) => elem.src = initialCards[index].link);
  cardsName.forEach((elem, index) => elem.textContent = initialCards[index].name);
}

function handleformElementMainContainer(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const cloneCard = clonePhoto.querySelector('.card').cloneNode(true);
  
  cloneCard.querySelector('.card__element').src = linkInputAddCard.value;
  cloneCard.querySelector('.card__signature').textContent = titleInputAddCard.value;

  cloneCard.querySelectorAll('.card__delete').forEach((elem) => {
    elem.addEventListener('click', () => {
       cloneCard.remove();
    })
  })

  cloneCard.querySelectorAll('.card__like').forEach((elem) => {
    elem.addEventListener('click', () => {
      elem.classList.add('card__like_active');
    })
  });

  cloneCard.querySelectorAll('.card__element').forEach((elem) => {
    elem.addEventListener('click', () => {
      document.querySelector('.popup-full__img').src = elem.src;
      cloneCard.querySelectorAll('.card__signature').forEach(elem => {
        document.querySelector('.popup-full__text').textContent = elem.textContent;
      })
      document.querySelector('.popup-full').classList.add('popup-full_opened');
    })
  });

  photo.prepend(cloneCard);
  closePopupAddCard();
}

function deleteCard() {
  btnDelete.forEach((elem, index) => {
    elem.addEventListener('click', () => {
      cards[index].remove();
    })
  })
}

function likeCard() {
// Перебор всех лайков
like.forEach((elem) => {
  elem.addEventListener('click', () => {
    elem.classList.add('card__like_active');
  })
});
}

// открытие полной картинки в попапе
function openFullPopup() {
  cards.forEach((elem, index) => {
    cardsImg[index].addEventListener('click', () => {
      document.querySelector('.popup-full__img').src = elem.querySelector('.card__element').src;
      document.querySelector('.popup-full__text').textContent = elem.textContent;
      document.querySelector('.popup-full').classList.add('popup-full_opened');
    });
  });
}

function closeFullPopup() {
  document.querySelector('.popup-full').classList.remove('popup-full_opened');
}

// обработчик кнопки редактирования для открытия попапа
buttonEditProfile.addEventListener('click', openPopupEditProfile);

// обработчик клика на закрытие попапа
buttonClosePopup.addEventListener('click', closePopup);

// обработчик кнопки сохранения инфы для профиля
formElement.addEventListener('submit', handleFormSubmit);

// Обработчик открытия попапа для добавления новой карты
buttonAddCard.addEventListener('click', openPopupAddCard);

// Обработчик кнопки закрытия попапа добавления новой карты
buttonClosePopupAdd.addEventListener('click', closePopupAddCard);

// Обработчик для сохранение новой карты с разными функциями
buttonSaveInfoCard.addEventListener('submit', handleformElementMainContainer);

// Обработчик кнопки закрытия полной картинки в попапе
closeBtnFull.addEventListener('click', closeFullPopup);

// Перебор массива и добавления картинок и имён карточек
pageLoad()
// удаление карт
deleteCard()
// лайки на картах
likeCard()
// открытие попапа с картинкой
openFullPopup()