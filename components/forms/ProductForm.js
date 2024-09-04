import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createProduct, updateProduct } from '../../api/productData';
import { getAllCategories } from '../../api/categoryData';

const initialState = {
  name: '',
  imageUrl: '',
  categoryId: '',
  price: 0,
  quantity: 1,
};

export default function ProductForm({ product }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getAllCategories().then(setCategories);
    if (product.id) setFormInput(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.id) {
      updateProduct(formInput).then(() => window.location.reload());
    } else {
      const payload = { ...formInput, sellerId: user.id };
      createProduct(payload).then(() => window.location.reload());
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{product.id ? 'Update' : 'Create'} a Product</h2>

      <FloatingLabel controlId="name" label="Product Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Product Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="imageUrl" label="Product Image URL" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an Image URL"
          name="imageUrl"
          value={formInput.imageUrl}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="category" label="Category">
        <Form.Select
          aria-label="Category"
          name="categoryId"
          onChange={handleChange}
          className="mb-3"
          value={formInput.categoryId}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="price" label="Price" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter Price"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="quantity" label="Quantity" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter Quantity"
          name="quantity"
          value={formInput.quantity}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button className="user-card-button" variant="danger" type="submit">{product.id ? 'Update' : 'Create'} Product</Button>
    </Form>
  );
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    categoryId: PropTypes.number,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }),
};

ProductForm.defaultProps = {
  product: initialState,
};
