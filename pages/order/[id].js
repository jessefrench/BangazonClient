import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getProductsByOrder } from '../../api/OrderData';
import ProductCard from '../../components/ProductCard';

export default function ViewOrder() {
  const [order, setOrder] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getProductsByOrder(id).then((data) => {
        setOrder(data);
      });
    }
  }, [id]);

  return (
    <Container>
      <Row>
        {order.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
