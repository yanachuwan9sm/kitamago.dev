import Head from 'next/head';
import React from 'react';

import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import style from './Layout.module.scss';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className={style.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
