import { ReactNode, useEffect } from 'react';
import { add_product } from '../features/products/productSlice';
import { add_customerId, selectUser } from '../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useRTK';
import { getCustomerId, getProductAPI } from '../plugins/firebase';
import '../styles/Layout.css';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  useEffect(() => {
    startPaymentSession();
    getCustomerIdInFirebase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startPaymentSession = async () => {
    const products = await getProductAPI();
    const customerId = await getCustomerId(user.email);
    console.log(
      '🚀 ~ file: Layout.tsx ~ line 21 ~ startPaymentSession ~ customerId',
      customerId
    );

    dispatch(add_customerId(customerId));
    dispatch(add_product(products));
  };

  const getCustomerIdInFirebase = async () => {
    const customerId = await getCustomerId(user.email);
    dispatch(add_customerId(customerId));
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
