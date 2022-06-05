import { ReactNode, useEffect } from 'react';
import { add_product } from '../features/products/productSlice';
import { useAppDispatch } from '../hooks/useRTK';
import { getProductAPI } from '../plugins/firebase';
import '../styles/Layout.css';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    startPaymentSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startPaymentSession = async () => {
    const products = await getProductAPI();
    dispatch(add_product(products));
  };

  return (
    <section className="layout-wrapper">
      <header>
        <Header />
      </header>
      <main className="layout-main">{children}</main>
    </section>
  );
};

export default Layout;
