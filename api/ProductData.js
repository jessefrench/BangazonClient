import { clientCredentials } from '../utils/client';

const getAllProducts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getSingleProduct = (productId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getProductsBySellerId = (sellerId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/seller/${sellerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getProductsByCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/category/${categoryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const createProduct = (formData) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const updateProduct = (formData) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${formData.productId}`, {
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

const deleteProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
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
  getAllProducts,
  getSingleProduct,
  getProductsBySellerId,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
