import { clientCredentials } from '../utils/client';

const getAllCategories = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getCategoryById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch category.');
      }
      return response.json();
    })
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error.message || 'An error occurred while fetching category.');
    });
});

export {
  getAllCategories,
  getCategoryById,
};
