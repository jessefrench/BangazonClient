import { clientCredentials } from '../utils/client';

const getOrderbyOrderId = (orderId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getProductsByOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getOrdersBySeller = (sellerId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/seller/${sellerId}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getOrdersByCustomer = (customerId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/customer/${customerId}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const createOrder = (user) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      orderId: 0,
      customerId: user.id,
      status: true,
    }),
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const addProductToOrder = (user, productId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/addproduct`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      orderId: user.orderId,
      productId,
    }),
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

export {
  getOrderbyOrderId,
  getOrdersByCustomer,
  getProductsByOrder,
  getOrdersBySeller,
  createOrder,
  addProductToOrder,
};
