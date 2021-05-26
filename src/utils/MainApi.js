class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInfo(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }).then((response) => this._checkRequestResult(response));
  }

  setInfo(name, email, jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((response) => this._checkRequestResult(response));
  }

  logout() {
    return fetch(`${this._baseUrl}/signout `, {
      method: 'POST',
      headers: this._headers,
    }).then((response) => this._checkRequestResult(response));
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((response) => this._checkRequestResult(response));
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
      .then((response) => this._checkRequestResult(response))
      // .then((data) => {
      //   if (data.jwt) {
      //     localStorage.setItem('jwt', data.jwt);
      //     this.updateHeaders();
      //     return data.jwt;
      //   }
      //   return Promise.reject(new Error(`Возникла ошибка: ${data.status}`));
      // });
  }

  updateHeaders() {
    this._headers = {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('jwt')}`,
    };
  }

  getSavedMovies(jwt) {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }).then((response) => this._checkRequestResult(response));
  }

  addMovie(movie, jwt) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailer: movie.trailerLink,
        movieId: movie.id.toString(),
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
      }),
    }).then((response) => this._checkRequestResult(response));
  }

  removeMovie(movieId, jwt) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }).then((response) => this._checkRequestResult(response));
  }

  _checkRequestResult(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Возникла ошибка: ${response.status}`));
  }

  errorHandler(error) {
    console.log(error);
  }
}

const mainApi = new MainApi({
  // baseUrl: 'https://marokkotv.nomoredomains.icu',
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
});

export default mainApi;
