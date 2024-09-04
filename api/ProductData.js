import { clientCredentials } from '../utils/client';

const getAllProducts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        reject(new Error('Network response was not ok'));
      } else {
        resolve(response.json());
      }
    })
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const searchProducts = (searchValue) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/search?searchValue=${searchValue}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        reject(new Error('Network response was not ok'));
      } else {
        resolve(response.json());
      }
    })
    .catch(reject);
});

export {
  getSingleProduct,
  getAllProducts,
  searchProducts,
};
