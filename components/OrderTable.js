import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function OrderTable({ orders }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>UID</th>
          <th>Status</th>
          <th>Payment Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.uid}</td>
            <td>{order.open ? 'Open' : 'Closed'}</td>
            <td>{order.paymentTypeId || 'N/A'}</td>
            <td>
              <Link href={`order/${order.id}`} passHref>
                <Button variant="danger">View Details</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

OrderTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      uid: PropTypes.string.isRequired,
      paymentTypeId: PropTypes.number,
      open: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
