export class UserInfo {
    constructor({ profileAuthor, profileProfession }) {
        this._profileAuthor = profileAuthor;
        this._profileProfession = profileProfession;
    }

    getUserInfo() {
        const author = this._profileAuthor.textContent;
        const profession = this._profileProfession.textContent;
        
        return { author, profession }
    }

    setUserInfo(author, profession) {
        this._profileAuthor.textContent = author;
        this._profileProfession.textContent = profession;
    }
}