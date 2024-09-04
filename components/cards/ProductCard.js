import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addProductToOrder, createOrder, getOpenOrder } from '../../api/orderData';

export default function ProductCard({ product, uid, onUpdate }) {
  const [currentOrderId, setCurrentOrderId] = useState(null);

  useEffect(() => {
    getOpenOrder(uid).then((order) => {
      if (order) {
        setCurrentOrderId(order.id);
      }
    });
  }, [uid]);

  const addThisProduct = () => {
    if (window.confirm(`Add ${product.name} to your cart?`)) {
      const payload = {
        orderId: currentOrderId,
        productId: product.id,
      };

      const handleAddProduct = () => {
        addProductToOrder(payload)
          .then(() => {
            onUpdate();
          })
          .catch((error) => {
            console.error('Error adding product to order:', error);
          });
      };

      if (!currentOrderId) {
        createOrder({ uid })
          .then((newOrder) => {
            setCurrentOrderId(newOrder.id);
            payload.orderId = newOrder.id;
            handleAddProduct();
          })
          .catch((error) => {
            console.error('Error creating new order:', error);
          });
      } else {
        handleAddProduct();
      }
    }
  };

  return (
    <Card className="complete-product-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Img variant="top" src={product.imageUrl} alt={product.name} style={{ height: '350px' }} />
      <Card.Body>
        <Card.Title className="card-title">{product.name}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button href={`/product/${product.id}`} variant="dark">
            View
          </Button>
          <Button variant="dark" onClick={addThisProduct}>
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    imageUrl: PropTypes.string,
    categoryId: PropTypes.number,
    price: PropTypes.number,
    quantity: PropTypes.number,
    sellerId: PropTypes.number,
  }).isRequired,
  uid: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
