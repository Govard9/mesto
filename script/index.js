// Открытие popup

let buttonEditProfile = document.querySelector(".profile__edit-button");

function listenBtnEditProfile() {
  let popup = document.querySelector(".popup");
  popup.classList.add("popup_opened");
}

buttonEditProfile.addEventListener("click", listenBtnEditProfile);

// Закрытие popup

let buttonClosePopUp = document.querySelector(".popup__close");

function listenBtnClosePopUp() {
  let hidePopUp = document.querySelector(".popup");
  hidePopUp.classList.remove("popup_opened");
}

buttonClosePopUp.addEventListener("click", listenBtnClosePopUp);

// Добавление active класса для кнопки like

let btnAll = document.querySelectorAll(".photo__like");

for (let i = 0; i < btnAll.length; i++) {
  btnAll[i].addEventListener("click", function () {
    btnAll[i].classList.add("photo__like_active");
  });
}

// Сохранение информации в попап

let formElement = document.querySelector(".popup__container");

let nameInput = formElement.querySelector(".poput__item-author");
let jobInput = formElement.querySelector(".poput__item-profession");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  
  // Получите значение полей jobInput и nameInput из свойства value
  let getAtributeName = nameInput.value;
  let getAtributeJob = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  let profileAuthor = document.querySelector(".profile__author");
  let profileProfession = document.querySelector(".profile__profession");

  // Вставьте новые значения с помощью textContent
  profileAuthor.textContent = getAtributeName;
  profileProfession.textContent = getAtributeJob; 
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 