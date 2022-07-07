import Head from 'next/head';
import React from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import style from './Layout.module.scss';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className={style.container}>
        <Header />
        <main className={style.main}>
          <div>{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
