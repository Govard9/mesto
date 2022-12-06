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

// Добавление массива с инфой в карточки
const cardsImg = document.querySelectorAll('.card__element');
const cardsName = document.querySelectorAll('.card__signature')

// Открытие popup
let buttonEditProfile = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

// Выберите элементы, куда должны быть вставлены значения полей
let profileAuthor = document.querySelector('.profile__author');
let profileProfession = document.querySelector('.profile__profession');

// Сохранение информации в попап
let formElement = document.querySelector('.popup__main-container');
let nameInput = formElement.querySelector('.popup__input_data_name');
let jobInput = formElement.querySelector('.popup__input_data_profession');

// Закрытие popup
let buttonClosePopup = document.querySelector('.popup__close-button');

// Открытие popup-add
let buttonAddCard = document.querySelector('.profile__add-button');
let popupAdd = document.querySelector('.popup-add');

// Выберите элементы, куда должны быть вставлены значения полей в popup-add
let cardSignature = document.querySelector('.card__signature');
let cardElement = document.querySelector('.card__element');

// Закрытие popup-add
let buttonClosePopupAdd = document.querySelector('.popup-add__close-button');

// Сохранение информации в popup-add
let formElementMainContainer = document.querySelector('.popup-add__main-container');
let titleInput = formElementMainContainer.querySelector('.popup-add__input_data_title');
let linkImgInput = formElementMainContainer.querySelector('.popup-add__input_data_link-img');

// Лайки для карточек
let like = document.querySelectorAll('.card__like');

function openPopup() {
  nameInput.value = profileAuthor.textContent;
  jobInput.value = profileProfession.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopupAdd() {
  popupAdd.classList.add('popup-add_opened');
}

function closePopupAdd() {
  popupAdd.classList.remove('popup-add_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Вставьте новые значения с помощью textContent
  profileAuthor.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup()
}

function handleformElementMainContainer(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  initialCards.unshift({
    name: titleInput.value,
    link: linkImgInput.value
  })
  cardsImg.forEach((elem, index) => elem.src = initialCards[index].link);
  cardsName.forEach((elem, index) => elem.textContent = initialCards[index].name);
  
  closePopupAdd()
}

// Перебор массива и добавления картинок и имён карточек
cardsImg.forEach((elem, index) => elem.src = initialCards[index].link);
cardsName.forEach((elem, index) => elem.textContent = initialCards[index].name);

// Перебор всех лайков
like.forEach((elem) => {
  elem.addEventListener('click', () => {
    elem.classList.add('card__like_active');
  })
});

buttonEditProfile.addEventListener('click', openPopup);
buttonClosePopup.addEventListener('click', closePopup);

buttonAddCard.addEventListener('click', openPopupAdd);
buttonClosePopupAdd.addEventListener('click', closePopupAdd);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

formElementMainContainer.addEventListener('submit', handleformElementMainContainer);