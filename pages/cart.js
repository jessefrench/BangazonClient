import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import CartProductCard from '../components/cards/CartProductCard';
import { getOrderProducts, getOpenOrder } from '../api/orderData';
import { useAuth } from '../utils/context/authContext';

export default function ViewCart() {
  const [orderDetails, setOrderDetails] = useState({});
  const [orderId, setOrderId] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  const calculateTotal = () => orderDetails.products?.reduce((total, product) => total + product.price, 0);

  useEffect(() => {
    getOpenOrder(user.uid)
      .then((order) => {
        if (order) {
          setOrderId(order.id);
          return getOrderProducts(order.id);
        }
        setOrderId(null);
        return Promise.resolve({ products: [] });
      })
      .then((orderData) => {
        setOrderDetails(orderData);
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
      });
  }, [user.uid]);

  const handleUpdate = () => {
    if (orderId) {
      getOrderProducts(orderId)
        .then(setOrderDetails)
        .catch((error) => {
          console.error('Error updating order data:', error);
        });
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="text-center my-4">
      {orderId ? (
        <>
          <h2>Order Details</h2>
          <div className="d-flex flex-wrap">
            {orderDetails.products?.map((product) => (
              <CartProductCard key={product.id} product={product} orderId={orderId} onUpdate={handleUpdate} />
            ))}
          </div>
          <h3>Total: ${calculateTotal()?.toFixed(2)}</h3>
          <Button variant="success" onClick={handleCheckout}>
            Checkout
          </Button>
        </>
      ) : (
        <p>No open order found. Please add items to your cart to proceed.</p>
      )}
    </div>
  );
}
