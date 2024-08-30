import React, { useEffect, useState } from 'react';
import {
  Form, Container, Row, Col,
} from 'react-bootstrap';
import { getAllProducts, getProductsByCategory } from '../api/ProductData';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);

  const renderProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleSort = (e) => {
    getProductsByCategory(e.target.value).then((data) => setProducts(data));
  };

  useEffect(() => {
    renderProducts();
  }, []);

  return (
    <Container>
      <Row className="justify-content-end mb-4">
        <Col xs={12} md={3}>
          <Form.Select onChange={handleSort} className="rounded-sm">
            <option onClick={renderProducts}>All</option>
            <option value="1">Electronics</option>
            <option value="2">Books</option>
            <option value="3">Clothing</option>
            <option value="4">Home & Garden</option>
            <option value="5">Toys</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <ProductCard product={product} onUpdate={renderProducts} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
