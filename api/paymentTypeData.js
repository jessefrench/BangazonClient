import { clientCredentials } from '../utils/client';

const getAllPaymentTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/payment-types`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const getPaymentTypeById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/payment-types/${id}`)
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
  getAllPaymentTypes,
  getPaymentTypeById,
};
