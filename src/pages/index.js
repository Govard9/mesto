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

const userInfo = new UserInfo({ profileAuthor, profileProfession });
api
  .getUserInfoProfile()
  .then((getInfo) => {
    userInfo.getUserInfo(getInfo);
  })
  .catch((err) => {
    console.log(err);
  });

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

// Добавление карточки на сайт через форму
const formAddCard = new PopupWithForm('.popup_add-card', {
  handleFormSubmit: (formData) => {
    renderLoadingAddCard(true);
    api
      .sendNewCard('POST', formData)
      .then((dataPostRequest) => {
        api.getUserInfoProfile().then((userInfo) => {
          const newCard = createCard(dataPostRequest, userInfo._id);
          cardsListSection.addItem(newCard);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formAddCard.close();
        renderLoadingAddCard(false);
      });
  },
});
formAddCard.setEventListeners();

// Отправляет карты в разметку автоматически
const cardsListSection = new Section(
  {
    items: api
      .getInitialCards()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }),
    renderer: (item) => {
      api
        .getUserInfoProfile()
        .then((userInfo) => {
          const newCard = createCard(item, userInfo._id);
          cardsListSection.addItem(newCard);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  '.photos'
);
cardsListSection.renderItems();

const handleOpenAddCard = () => {
  formValidAddCard.resetValidation();

  // Добавление карт на сайт
  formAddCard.open();
};

// Изменение данных в профиле текст
const formProfile = new PopupWithForm('.popup_profile-popup', {
  handleFormSubmit: (formData) => {
    renderLoadingProfileText(true);
    api
      .updateEditProfile('PATCH', formData)
      .then((resultUserRequest) => {
        userInfo.setUserInfo(resultUserRequest);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formProfile.close();
        renderLoadingProfileText(false);
      });
  },
});
formProfile.setEventListeners();

// Изменение данных в профиле аватар
const formProfileAvatar = new PopupWithForm('.popup_update-avatar', {
  handleFormSubmit: (linkAvatar) => {
    renderLoadingUpdateAvatar(true);
    api.updateAvatar('PATCH', linkAvatar).then((resultAvatarRequest) => {
      formProfileAvatar.setEventListeners(resultAvatarRequest);
      api
        .getUserInfoProfile()
        .then((getInfo) => {
          profileAvatar.src = getInfo.avatar;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          formProfileAvatar.close();
          renderLoadingUpdateAvatar(false);
        });
    });
  },
});
formProfileAvatar.setEventListeners();

// обновление аватара при загрузке страницы
api.getUserInfoProfile().then((getInfo) => {
  profileAvatar.src = getInfo.avatar;
});

// изменения в профиле пользователя
const handleOpenProfilePopup = () => {
  formValidProfile.resetValidation();
  api
    .getUserInfoProfile()
    .then((getInfo) => {
      nameInput.value = getInfo.name;
      jobInput.value = getInfo.about;
    })
    .catch((err) => {
      console.log(err);
    });

  formProfile.open();
};

// изменения ссылки аватара в профиле
const updateAvatarProfile = () => {
  formValidProfileAvatar.resetValidation();
  formProfileAvatar.open();
};

// загрузка профиля текст
function renderLoadingProfileText(isLoading) {
  if (isLoading) {
    popupProfileMod.querySelector(
      validationConfig.submitButtonSelector
    ).textContent = 'Сохранение...';
  } else if (!isLoading) {
    popupProfileMod.querySelector(
      validationConfig.submitButtonSelector
    ).textContent = 'Сохранить';
  }
}

// загрузка добавление карточек
function renderLoadingAddCard(isLoading) {
  if (isLoading) {
    popupAddCardMod.querySelector(
      validationConfig.submitButtonSelector
    ).textContent = 'Создание...';
  } else if (!isLoading) {
    popupAddCardMod.querySelector(
      validationConfig.submitButtonSelector
    ).textContent = 'Создать';
  }
}

// загрузка добавление карточек
function renderLoadingUpdateAvatar(isLoading) {
  if (isLoading) {
    popupUpdateAvatar.querySelector(
      validationConfig.submitButtonSelector
    ).textContent = 'Сохранение...';
  } else if (!isLoading) {
    popupUpdateAvatar.querySelector(
      validationConfig.submitButtonSelector
    ).textContent = 'Сохранить';
  }
}

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