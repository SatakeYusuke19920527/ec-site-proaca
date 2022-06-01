import React from 'react';
import { getStripeAPI } from '../plugins/firebase';
import '../styles/Product.css';

const Product = ({
  name,
  desctiption,
  imgUrl,
  default_price,
}: {
  name: string;
  desctiption: string;
  imgUrl: string;
  default_price: string;
}) => {
  const getPayment = async () => {
    await getStripeAPI(default_price);
  };
  return (
    <section className="card-area" onClick={getPayment}>
      <div className="photo">
        <img src={imgUrl} alt={name} />
      </div>
      <div className="explanation">
        <p>{name}</p>
        <p>{desctiption}</p>
      </div>
    </section>
  );
};

export default Product;
