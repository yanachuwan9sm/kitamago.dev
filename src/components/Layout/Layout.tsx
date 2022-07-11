import Head from 'next/head';
import React from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import style from './Layout.module.scss';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className={style.main}>
        <div className={style.container}>{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
