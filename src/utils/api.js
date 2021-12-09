import {BASE_URL} from './constants';

class Api {
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
    myData() {
        return fetch(`${this.baseurl}/users/me`, { headers: this.headers, credentials: this.credentials })
            .then(this._handleResponse);
    }
    profileEdit(user_name, user_description) {
        return fetch(`${this.baseurl}/users/me`, {
                method: 'PATCH',
                headers: this.headers,
                credentials: this.credentials,
                body: JSON.stringify({
                    name: user_name,
                    about: user_description
                })
            })
            .then(this._handleResponse);
    }
    avatarReplace(avatar) {
        return fetch(`${this.baseurl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this.headers,
                 credentials: this.credentials,
                body: JSON.stringify({
                    avatar: avatar
                })
            })
            .then(this._handleResponse);
    }
    addCard(card_title, card_link) {
        return fetch(`${this.baseurl}/cards`, {
                method: 'POST',
                headers: this.headers,
                credentials: this.credentials,
                body: JSON.stringify({
                    name: card_title,
                    link: card_link
                })
            })
            .then(this._handleResponse);
    }
    deleteCard(card_id) {
        return fetch(`${this.baseurl}/cards/${card_id}`, {
                method: 'DELETE',
                credentials: this.credentials,
                headers: this.headers
            })
            .then(this._handleResponse);
    }
    addLike(card_id) {
        return fetch(`${this.baseurl}/cards/${card_id}/likes`, {
                method: 'PUT',
                credentials: this.credentials,
                headers: this.headers
            })
            .then(this._handleResponse)
    }
    removeLike(card_id) {
        return fetch(`${this.baseurl}/cards/${card_id}/likes`, {
                method: 'DELETE',
                credentials: this.credentials,
                headers: this.headers
            })
            .then(this._handleResponse);
    }

    changeLike(card_id, isLiked) {
        return isLiked ? this.removeLike(card_id) : this.addLike(card_id);
    }

    getCards() {
        return fetch(`${this.baseurl}`, { headers: this.headers, credentials: this.credentials })
            .then(this._handleResponse);
    }

    logout() {
        return fetch(`${this.baseurl}/logout`, { headers: this.headers, credentials: this.credentials })
            .then(this._handleResponse);
    }



}

const api = new Api({
    baseUrl:  BASE_URL,
    // credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    }
});
export default api;
 