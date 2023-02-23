export class UserInfo {
  constructor({ profileAuthor, profileProfession }) {
    this._profileAuthor = profileAuthor;
    this._profileProfession = profileProfession;
  }

  getUserInfo(getInfo) {
    this._profileAuthor.textContent = getInfo.name;
    this._profileProfession.textContent = getInfo.about;
    
  }

  setUserInfo(resultUserRequest) {
    this._profileAuthor.textContent = resultUserRequest.name;
    this._profileProfession.textContent = resultUserRequest.about;
  }
}
