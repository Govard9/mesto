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

// Открытие popup
let buttonEditProfile = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

// Выберите элементы, куда должны быть вставлены значения полей
let profileAuthor = document.querySelector('.profile__author');
let profileProfession = document.querySelector('.profile__profession');

// Закрытие popup
let buttonClosePopup = document.querySelector('.popup__close-button');

// Сохранение информации в попап
let formElement = document.querySelector('.popup__main-container');
let nameInput = formElement.querySelector('.popup__input_data_name');
let jobInput = formElement.querySelector('.popup__input_data_profession');

function openPopup() {
  nameInput.value = profileAuthor.textContent;
  jobInput.value = profileProfession.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
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

buttonClosePopup.addEventListener('click', closePopup);

buttonEditProfile.addEventListener('click', openPopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
