import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/productData';
import ProductCard from '../components/cards/ProductCard';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../utils/context/authContext';

export default function ShowProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  const getAllTheProducts = () => {
    getAllProducts().then(setProducts);
  };

  useEffect(() => {
    getAllTheProducts();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <SearchBar className="navSearch" />
        <div className="d-flex flex-wrap">
          {products.map((product) => <ProductCard key={product.id} uid={user.uid} product={product} onUpdate={getAllProducts} />)}
        </div>
      </div>
    </>
  );
}
