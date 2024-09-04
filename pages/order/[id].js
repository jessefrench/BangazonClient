import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CartProductCard from '../../components/cards/CartProductCard';
import { getOrderProducts } from '../../api/orderData';

export default function ViewOrder() {
  const [orderDetails, setOrderDetails] = useState({});
  const [orderId, setOrderId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      setOrderId(router.query.id);
      getOrderProducts(router.query.id).then(setOrderDetails);
    }
  }, [router.query.id]);

  const handleUpdate = () => {
    getOrderProducts(orderId).then(setOrderDetails);
  };

  return (
    <>
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {orderDetails.products?.map((product) => (
            <CartProductCard key={product.id} product={product} orderId={orderId} onUpdate={handleUpdate} />
          ))}
        </div>
      </div>
    </>
  );
}
