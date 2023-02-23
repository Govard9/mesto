export class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      });
  }

  updateEditProfile(patch, data) {
    return fetch(`${this._url}/users/me`, {
      method: patch,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.firstname,
        about: data.profession,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        return data;
      });
  }

  getUserInfoProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      });
  }

  sendNewCard(post, data) {
    return fetch(`${this._url}/cards`, {
      method: post,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        return data;
      });
  }

  deleteCard(del, id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: del,
      headers: {
        authorization: this._token,
      },
    });
  }

  liking(put, cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: put,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        return data;
      });
  }

  deleteLiking(del, cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: del,
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        return data;
      });
  }

  updateAvatar(patch, avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: patch,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        return data;
      });
  }
}
