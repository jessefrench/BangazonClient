import { clientCredentials } from '../utils/client';

const getUserDetails = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/details/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const switchUserToSeller = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/sell/${uid}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const updateUser = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getUserDetails,
  switchUserToSeller,
  updateUser,
};
