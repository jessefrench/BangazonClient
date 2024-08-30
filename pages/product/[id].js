import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import { getSingleProduct } from '../../api/ProductData';

export default function ViewProduct() {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleProduct(id).then((data) => {
        setProduct(data);
      });
    }
  }, [id]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="text-center">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt="Thumbnail"
              width={350}
              height={350}
              className="img-fluid"
              layout="intrinsic"
            />
          )}
        </Col>
        <Col md={6} className="p-3">
          <h1 className="fs-1 fw-semibold">{product.name}</h1>
          <p className="fs-4 fw-semibold">${product.price}</p>
          <p>{product.description}</p>
        </Col>
      </Row>
    </Container>
  );
}
