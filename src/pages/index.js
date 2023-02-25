import './index.css'; // добавьте импорт главного файла стилей
import {
  validationConfig,
  profileAuthor,
  profileProfession,
  profileBlockAvatar,
  profileAvatar,
  nameInput,
  jobInput,
  buttonAddCard,
  popupProfileMod,
  popupAddCardMod,
  popupUpdateAvatar,
  buttonEditProfile,
} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

let userId;
let cardsListSection;

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-60',
  '2ba4031f-f997-482b-b349-7c66bdec4853'
);

const popupWithImage = new PopupWithImage('.popup_full-image');
popupWithImage.setEventListeners();

const handleCardDelete = (cardId, cardDelete) => {
  api
    .deleteCard('DELETE', cardId)
    .then(() => {
      cardDelete.remove();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(err);
    });
};

const popupDeleteCard = new PopupDeleteCard(
  '.popup_delete-card',
  handleCardDelete
);
popupDeleteCard.setEventListeners();

const userInfo = new UserInfo({
  profileAuthor,
  profileProfession,
  profileAvatar,
});

Promise.all([api.getUserInfoProfile(), api.getInitialCards()])
  // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  .then(([getInfo, card]) => {
    // тут установка данных пользователя
    // и тут отрисовка карточек
    userInfo.setUserInfo(getInfo.name, getInfo.about, getInfo.avatar);
    userId = getInfo._id;

    cardsListSection = new Section(
      {
        items: card,
        renderer: (item) => {
          const newCard = createCard(item, getInfo._id);
          cardsListSection.addItem(newCard);
        },
      },
      '.photos'
    );
    cardsListSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

// Добавление карточки на сайт через форму
const formAddCard = new PopupWithForm('.popup_add-card', {
  handleFormSubmit: (formData) => {
    return api
      .sendNewCard('POST', formData)
      .then((dataPostRequest) => {
        const newCard = createCard(dataPostRequest, userId);
        cardsListSection.addItem(newCard);
        formAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
  },
});
formAddCard.setEventListeners();

const createCard = (formData, Info) => {
  const card = new Card(
    {
      item: formData,
      handleCardClick: () => {
        popupWithImage.open({ name: formData.name, link: formData.link });
      },
      handleLiked: (cardId) => {
        const newLiked = api.liking('PUT', cardId);
        return newLiked;
      },
      handleCardDelete: (cardId, cardDelete) => {
        popupDeleteCard.open(cardId, cardDelete);
      },
      handleLikedDelete: (cardId) => {
        const likedDelete = api.deleteLiking('DELETE', cardId);
        return likedDelete;
      },
      userId: Info,
    },
    '#new-card'
  );

  const cardElement = card.generateCard();
  return cardElement;
};

const handleOpenAddCard = () => {
  formValidAddCard.resetValidation();

  // Добавление карт на сайт
  formAddCard.open();
};

// Изменение данных в профиле текст
const formProfile = new PopupWithForm('.popup_profile-popup', {
  handleFormSubmit: (formData) => {
    return api
      .updateEditProfile('PATCH', formData)
      .then((userRequest) => {
        userInfo.setUserInfo(
          userRequest.name,
          userRequest.about,
          userRequest.avatar
        );
        formProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
  },
});
formProfile.setEventListeners();

// Изменение данных в профиле аватар
const formProfileAvatar = new PopupWithForm('.popup_update-avatar', {
  handleFormSubmit: (linkAvatar) => {
    return api
      .updateAvatar('PATCH', linkAvatar)
      .then((resultAvatarRequest) => {
        formProfileAvatar.setEventListeners(resultAvatarRequest);
        userInfo.setUserInfo(
          resultAvatarRequest.name,
          resultAvatarRequest.about,
          resultAvatarRequest.avatar
        );
        formProfileAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
  },
});
formProfileAvatar.setEventListeners();

// изменения в профиле пользователя
const handleOpenProfilePopup = () => {
  formValidProfile.resetValidation();

  const dataUser = userInfo.getUserInfo();
  nameInput.value = dataUser.getName;
  jobInput.value = dataUser.getProfession;
  formProfile.open();
};

// изменения ссылки аватара в профиле
const updateAvatarProfile = () => {
  formValidProfileAvatar.resetValidation();
  formProfileAvatar.open();
};

// Обработчик нажатия на +
buttonAddCard.addEventListener('click', () => {
  handleOpenAddCard();
});

// обработчик открытия попапа профиля
buttonEditProfile.addEventListener('click', () => {
  handleOpenProfilePopup();
});

// обработчик загрузки аватара в профле
profileBlockAvatar.addEventListener('click', () => {
  updateAvatarProfile();
});

const formValidProfile = new FormValidator(validationConfig, popupProfileMod);
formValidProfile.enableValidation();

const formValidAddCard = new FormValidator(validationConfig, popupAddCardMod);
formValidAddCard.enableValidation();

const formValidProfileAvatar = new FormValidator(
  validationConfig,
  popupUpdateAvatar
);
formValidProfileAvatar.enableValidation();
