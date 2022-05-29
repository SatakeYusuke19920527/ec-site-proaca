import React from 'react';
import '../styles/Product.css';

const Product = () => {
  return (
    <section className="card-area">
      <div className="photo"></div>
      <div className="explanation">
        <p>20,000¥</p>
        <p>商品情報が掲載されます。</p>
      </div>
    </section>
  );
};

export default Product;
