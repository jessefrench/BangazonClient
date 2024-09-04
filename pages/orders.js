import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getAllOrders } from '../api/orderData';
import OrderTable from '../components/OrderTable';

export default function ShowOrders() {
  const [openOrders, setOpenOrders] = useState([]);
  const [closedOrders, setClosedOrders] = useState([]);
  const { user } = useAuth();

  const getAllTheOrders = () => {
    getAllOrders(user.uid).then((orders) => {
      const open = [];
      const closed = [];
      orders.forEach((order) => {
        if (order.open) {
          open.push(order);
        } else {
          closed.push(order);
        }
      });
      setOpenOrders(open);
      setClosedOrders(closed);
    });
  };

  useEffect(() => {
    getAllTheOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="order-headers">Open Orders</h2>
        <div className="w-100">
          <OrderTable orders={openOrders} />
        </div>
      </div>
      <br />
      <br />
      <div className="text-center">
        <h2 className="order-headers">Closed Orders</h2>
        <div className="w-100">
          <OrderTable orders={closedOrders} />
        </div>
      </div>
    </div>
  );
}
