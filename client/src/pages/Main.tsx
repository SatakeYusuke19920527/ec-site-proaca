import React from 'react';
import Layout from '../components/Layout';
import Product from '../components/Product';
import '../styles/Main.css';

const Main = () => {
  return (
    <Layout>
      <section className="main-section">
        <main>
          <Product />
          <Product />
          <Product />
        </main>
      </section>
    </Layout>
  );
};

export default Main;
