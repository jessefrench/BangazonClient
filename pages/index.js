import { useEffect, useState } from 'react';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/forms/RegisterForm';
import ProductCard from '../components/cards/ProductCard';
import { getAllProducts } from '../api/productData';

export default function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState();
  const [products, setProducts] = useState([]);

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  useEffect(() => {
    checkUser(user.uid).then((data) => setAuthUser(data));
    getAllProducts().then(setProducts);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]);

  return (
    <>
      {authUser?.uid === user?.uid ? (
        <>
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{
              padding: '30px',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <h1>Hello {user?.fbUser?.displayName}!</h1>
          </div>
          <div className="text-center my-4">
            <h2>Recently Added</h2>
            <div className="d-flex flex-wrap">
              {products.slice(0, 20).reverse().map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  uid={user.uid}
                  onUpdate={getAllProducts}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <RegisterForm user={user} onUpdate={onUpdate} mode="register" />
      )}
    </>
  );
}
