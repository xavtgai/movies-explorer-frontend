import {MOVIES_URL} from './constants';

class Movie_api {
    constructor({
        baseUrl,
        headers, 
        // credentials
    }) {
        this.baseurl = baseUrl;
        this.headers = headers;
        // this.credentials = credentials;

    }

    _handleResponse(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`)
    }

    getInitialCards() {
        return fetch(`${this.baseurl}`, { headers: this.headers, credentials: this.credentials })
            .then(this._handleResponse);
    }
}

const movie_api = new Movie_api({
    baseUrl:  MOVIES_URL,
    // credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    }
});
export default movie_api;
 