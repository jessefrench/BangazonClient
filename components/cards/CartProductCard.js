import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { removeProductFromOrder } from '../../api/orderData';

export default function CartProductCard({ product, orderId, onUpdate }) {
  const removeThisProduct = () => {
    if (window.confirm(`Remove ${product.name} from your cart?`)) {
      removeProductFromOrder(orderId, product.id)
        .then(() => {
          onUpdate();
        })
        .catch((error) => {
          console.error('Error removing product from order:', error);
        });
    }
  };

  return (
    <Card className="complete-product-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Img variant="top" src={product.imageUrl} alt={product.name} style={{ height: '350px' }} />
      <Card.Body>
        <Card.Title className="card-title">{product.name}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        <Button className="user-card-button" variant="danger" onClick={removeThisProduct}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
}

CartProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    imageUrl: PropTypes.string,
    categoryId: PropTypes.number,
    price: PropTypes.number,
    sellerId: PropTypes.number,
  }).isRequired,
  orderId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
