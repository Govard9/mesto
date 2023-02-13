export class Api {
  constructor(url) {
    this.url = url;
  }

  getInitialCards() {
    // ...
  }

  getInitialCards() {
    return fetch(this.url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }})
    .then((data) => {
      return data.results;
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
