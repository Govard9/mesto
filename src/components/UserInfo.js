export class UserInfo {
    constructor({ profileAuthor, profileProfession }) {
        this._profileAuthor = profileAuthor;
        this._profileProfession = profileProfession;
    }

    getUserInfo() {
        const getName = this._profileAuthor.textContent;
        const getProfession = this._profileProfession.textContent;
        
        return { getName, getProfession }
    }

    setUserInfo(autor, profession) {
        this._profileAuthor.textContent = autor;
        this._profileProfession.textContent = profession;
    }
}