import { clientCredentials } from '../utils/client';

const getSingleUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const updateRegisteredUser = (formData) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user/${formData.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((resp) => {
      if (resp.status === 204) {
        resolve({});
      } else {
        reject(resp.json());
      }
    })
    .catch(reject);
});

export {
  getSingleUser,
  updateRegisteredUser,
};
