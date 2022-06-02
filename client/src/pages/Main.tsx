import React from 'react';
import Layout from '../components/Layout';
import Product from '../components/Product';
import { selectProducts } from '../features/products/productSlice';
import { useAppSelector } from '../hooks/useRTK';
import '../styles/Main.css';

const Main = () => {
  const products = useAppSelector(selectProducts);
  return (
    <Layout>
      <section className="main-section">
        <main>
          {products.map((product, index) => {
            return (
              <Product
                name={product.name}
                desctiption={product.description}
                imgUrl={product.images[0]}
                default_price={product.default_price}
                unit_amount={product.unit_amount!}
                key={index}
              />
            );
          })}
        </main>
      </section>
    </Layout>
  );
};

export default Main;
