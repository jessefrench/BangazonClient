import {
  Button, Row, Col, Container,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/RegisterForm';
import { createOrder } from '../api/OrderData';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/ProductData';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [authUser, setAuthUser] = useState();
  const [products, setProducts] = useState([]);

  const renderProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const createCart = () => {
    createOrder(user).then(() => {
      router.push('/order');
      renderProducts();
    });
  };

  const onUpdate = () => {
    checkUser(user.uid).then((data) => {
      setAuthUser(data);
    });
  };

  useEffect(() => {
    checkUser(user.uid).then((data) => {
      setAuthUser(data);
    });
    renderProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {authUser?.uid === user?.uid ? (
        <Container className="mt-4">
          <Row className="align-items-center mb-4">
            <Col>
              <h1 className="fs-3">Recently Added</h1>
            </Col>
            <Col className="text-end">
              <Button onClick={createCart} variant="dark" className="shadow-sm">
                Start Shopping
              </Button>
            </Col>
          </Row>
          <Row>
            {products.slice(0, 20).reverse().map((product) => (
              <Col key={product.productId} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <ProductCard product={product} onUpdate={renderProducts} />
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <RegisterForm user={user} onUpdate={onUpdate} />
      )}
    </>
  );
}
