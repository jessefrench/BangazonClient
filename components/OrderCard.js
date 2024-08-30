import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export default function OrderCard({ order }) {
  return (
    <Card className="mb-3 shadow-sm" data-v0-t="card">
      <Card.Body className="text-center">
        <Card.Title className="fs-6 mb-3">Order Number: {order.id}</Card.Title>
        <div className="d-flex justify-content-center align-items-baseline mb-3">
          <p className="mb-0 me-2 fs-6 font-weight-bold">Status:</p>
          {order.open ? (
            <span className="text-success fs-5">●</span>
          ) : (
            <span className="text-danger fs-5">●</span>
          )}
        </div>
        <Button href={`/order/${order.id}`} variant="dark">
          View
        </Button>
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    customerId: PropTypes.number,
    open: PropTypes.bool,
  }).isRequired,
};
