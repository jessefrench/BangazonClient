import { clientCredentials } from '../utils/client';

const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      }
      const text = await response.text();
      throw new Error(text);
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const addProductToOrder = async (payload) => {
  try {
    const response = await fetch(`${clientCredentials.databaseURL}/orders/add-product`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      if (response.status === 204) {
        console.warn('Product added to order successfully.');
      } else {
        const data = await response.json();
        console.warn('Product added to order:', data);
      }
    } else {
      const errorText = await response.text();
      throw new Error(`Error adding product to order: ${errorText}`);
    }
  } catch (error) {
    console.error(error);
  }
};

const removeProductFromOrder = (orderId, productId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${orderId}/products/${productId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      resolve(response.json());
    })
    .catch(reject);
});

const getOrderProducts = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}/products`, {
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
    .catch((error) => reject(error));
});

const getOpenOrder = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/open?uid=${uid}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve(null);
      }
    })
    .catch((error) => reject(error));
});

const completeOrder = (orderData) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/complete`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        reject(new Error(`Network response was not ok: ${error.message}`));
      }
      return response.json();
    })
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error);
    });
});

export {
  createOrder,
  addProductToOrder,
  getOrderProducts,
  removeProductFromOrder,
  getOpenOrder,
  completeOrder,
};
