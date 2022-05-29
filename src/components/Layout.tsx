import { ReactNode } from 'react';
import '../styles/Layout.css';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => {
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
