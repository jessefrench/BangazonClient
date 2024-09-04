import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Button, Col, Row, Card,
} from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import getAllPaymentTypes from '../../api/paymentTypeData';
import { getUserDetails } from '../../api/userData';
import { completeOrder, getOrderProducts } from '../../api/orderData';

export default function CheckoutForm({ orderId, onOrderComplete }) {
  const { user } = useAuth();
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [orderSummary, setOrderSummary] = useState({});

  useEffect(() => {
    getUserDetails(user.uid);
    getAllPaymentTypes(user.uid).then(setPaymentTypes);
    getOrderProducts(orderId).then(setOrderSummary);
  }, [user.uid, orderId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const orderData = {
      orderId,
      user,
      paymentTypeId: selectedPaymentType,
      open: false,
    };

    completeOrder(orderData)
      .then(() => {
        onOrderComplete();
      })
      .catch((error) => {
        console.error('Error completing order:', error);
      });
  };

  const calculateTotal = () => orderSummary.products?.reduce((total, product) => total + product.price, 0);

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Checkout</h2>

      {/* Order Summary */}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Order Summary</Card.Title>
          <ul>
            {orderSummary.products?.map((product) => (
              <li key={product.id}>
                {product.name} ${product.price}
              </li>
            ))}
          </ul>
          <h5>Total: ${calculateTotal()?.toFixed(2)}</h5>
        </Card.Body>
      </Card>

      {/* Shipping Information */}
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextShippingAddress">
        <Form.Label column sm="2">
          Shipping Address
        </Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            readOnly
            defaultValue={`${user.firstName} ${user.lastName}`}
          />
          <Form.Control
            plaintext
            readOnly
            defaultValue={`${user.address}`}
          />
          <Form.Control
            plaintext
            readOnly
            defaultValue={`${user.city}, ${user.state} ${user.zip}`}
          />
        </Col>
      </Form.Group>

      {/* Payment Type */}
      <Form.Group as={Row} className="mb-3" controlId="formPaymentType">
        <Form.Label column sm="2">
          Payment Type
        </Form.Label>
        <Col sm="10">
          <Form.Select
            aria-label="Select Payment Type"
            value={selectedPaymentType}
            onChange={(e) => setSelectedPaymentType(e.target.value)}
            required
          >
            <option value="">Select Payment Type</option>
            {paymentTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit">
        Complete Order
      </Button>
    </Form>
  );
}

CheckoutForm.propTypes = {
  orderId: PropTypes.number.isRequired,
  onOrderComplete: PropTypes.func.isRequired,
};
