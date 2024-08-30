import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Card, Button, Image } from 'react-bootstrap';
import { deleteProduct } from '../api/ProductData';

export default function ProductCard({ product }) {
  const router = useRouter();
  const { pathname } = router;
  const isMainPage = pathname === ('/');
  const isShop = pathname.includes('/shop');
  const isDashboard = pathname.includes('/dashboard');

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      deleteProduct(product.id);
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body className="text-center">
        <Image
          src={product.imageUrl}
          alt="Thumbnail"
          width="100"
          height="100"
          rounded
          className="mb-3 border"
        />
        <Card.Title className="fs-6">{product.name}</Card.Title>
      </Card.Body>

      <Card.Footer className="d-flex justify-content-around">
        {isMainPage && !isShop && !isDashboard && (
          <Button href={`/product/${product.id}`} variant="dark">
            View
          </Button>
        )}

        {isShop && !isDashboard && (
          <>
            <Button href={`/product/${product.id}`} variant="dark">
              View
            </Button>
            <Button variant="dark" className="ms-auto">
              Add
            </Button>
          </>
        )}

        {isDashboard && (
          <>
            <Button href={`/product/edit/${product.id}`} variant="dark">
              Edit
            </Button>
            <Button onClick={handleDelete} variant="dark" className="ms-auto">
              Delete
            </Button>
          </>
        )}
      </Card.Footer>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
};
