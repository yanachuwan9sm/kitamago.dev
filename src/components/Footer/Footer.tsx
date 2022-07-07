import React from 'react';

import styles from '../Footer/Footer.module.scss';

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          kitamago-log 2022
        </a>
      </footer>
    </>
  );
};

export default Footer;
