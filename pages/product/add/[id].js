import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductForm from '../../../components/forms/ProductForm';
import { getSingleProduct } from '../../../api/productData';

export default function AddProductToCart() {
  const [addProduct, setAddProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleProduct(id).then(setAddProduct);
  }, [id]);

  return (<ProductForm product={addProduct} />);
}
