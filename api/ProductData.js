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

const createProduct = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateProduct = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getProductOrdersById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${id}/orders`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
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
  createProduct,
  updateProduct,
  getProductOrdersById,
  searchProducts,
};
