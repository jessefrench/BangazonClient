import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function UserDetailCard({ userDetails }) {
  return (
    <Card style={{ width: '22rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title className="d-flex flex-column align-items-center justify-content-center">User Details</Card.Title>
        <Card.Text><strong>First Name:</strong> {userDetails.firstName}</Card.Text>
        <Card.Text><strong>Last Name:</strong> {userDetails.lastName}</Card.Text>
        <Card.Text><strong>Email:</strong> {userDetails.email}</Card.Text>
        <Card.Text><strong>Address:</strong> {userDetails.address}</Card.Text>
        <Card.Text><strong>City:</strong> {userDetails.city}</Card.Text>
        <Card.Text><strong>State:</strong> {userDetails.state}</Card.Text>
        <Card.Text><strong>ZIP:</strong> {userDetails.zip}</Card.Text>
        <Link href={`/user/edit/${userDetails.uid}`} passHref>
          <Button variant="dark">Edit</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

UserDetailCard.propTypes = {
  userDetails: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    seller: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
};
