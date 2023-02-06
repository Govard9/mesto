import initialCards from '../utils/cards.js'
import './index.css'; // добавьте импорт главного файла стилей
import { 
  validationConfig,
  profileAuthor, 
  profileProfession,
  nameInput,
  jobInput,
  buttonAddCard,
  popupProfileMod,
  popupAddCardMod,
  cardsContainer,
  buttonEditProfile
} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const popupWithImage = new PopupWithImage('.popup_full-image');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({ profileAuthor, profileProfession });

const formAddCard = new PopupWithForm('.popup_add-card', {
  handleFormSubmit: (formData) => {
    const newCard = createCard(formData);
    cardsContainer.prepend(newCard);
    formAddCard.close();
  }
})
formAddCard.setEventListeners();

const formProfile = new PopupWithForm('.popup_profile-popup', {
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData.firstname, formData.profession)
    formProfile.close();
  }
})
formProfile.setEventListeners();


// Отправляет разметку в класс Section
const cardsListSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({ item: item,
      handleCardClick: () => {
        popupWithImage.open({ name: item.name, link: item.link });
      }
    },
      '#new-card');
    const cardElement = card.generateCard();
    cardsListSection.addItem(cardElement);
  }
}, ".photos");
cardsListSection.renderItems();

const createCard = (formData) => {
  const card = new Card({ item: formData,
    handleCardClick: () => {
      popupWithImage.open({ name: formData.name, link: formData.link });
    }
  }, '#new-card');

  const cardElement = card.generateCard();
  return cardElement;
}

const handleOpenAddCard = () => {
  formValidAddCard.resetValidation();
  
  // Добавление карт на сайт
  formAddCard.open();
}

// изменения в профиле пользователя
const handleOpenProfilePopup = () => {
  const getUserInfo = userInfo.getUserInfo()
  nameInput.value = getUserInfo.author;
  jobInput.value = getUserInfo.profession;
  formProfile.open();
}

// Обработчик нажатия на +
buttonAddCard.addEventListener('click', () => {
  handleOpenAddCard();
});

// обработчик открытия попапа профиля
buttonEditProfile.addEventListener('click', (evt) => {
  handleOpenProfilePopup(evt);
});

const formValidProfile = new FormValidator(validationConfig, popupProfileMod);
formValidProfile.enableValidation();

const formValidAddCard = new FormValidator(validationConfig, popupAddCardMod);
formValidAddCard.enableValidation();