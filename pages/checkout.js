import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getOpenOrder } from '../api/orderData';
import CheckoutForm from '../components/forms/CheckoutForm';
import { useAuth } from '../utils/context/authContext';

export default function CheckoutPage() {
  const { user } = useAuth();
  const [orderId, setOrderId] = useState(null);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getOpenOrder(user.uid)
      .then((order) => {
        if (order) {
          setOrderId(order.id);
        }
      });
  }, [user.uid]);

  const handleOrderComplete = () => {
    setOrderCompleted(true);
    setTimeout(() => {
      router.push('/');
    }, 5000);
  };

  if (orderCompleted) {
    return (
      <div className="text-center my-4">
        <h2>Thank you for your order!</h2>
        <p>Your order has been completed successfully. You will be redirected to the home page shortly.</p>
      </div>
    );
  }

  if (!orderId) {
    return <p>No open order found.</p>;
  }

  return <CheckoutForm orderId={orderId} onOrderComplete={handleOrderComplete} />;
}
