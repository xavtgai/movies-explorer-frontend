
import {BASE_URL} from './constants';

function handleResponse(response) {
  if (response.ok) {
      return response.json();

  }

  return Promise.reject(`Ошибка: ${response.status}`)
}

export const register = (password, email, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email, name})
  }).then(handleResponse)}  


export const authorize = (email, password) => {
  
return fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  body: JSON.stringify({email, password})
})
.then(handleResponse)
};

  export const handleTokenCheck = () => {

    return fetch(`${BASE_URL}/users/me`, {
       method: 'GET',
      headers: {
        'Content-Type': 'application/json',      
      },
      credentials: 'include',
    })
    .then((res) => handleResponse(res)).catch(console.err);
  }