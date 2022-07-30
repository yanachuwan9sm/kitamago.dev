import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { IconContext } from 'react-icons';
import { FaUserAlt } from 'react-icons/fa';
import { FaRegEnvelope } from 'react-icons/fa';
import { useTheme } from 'styled-components';

import { useElementHeight } from '../../hooks/useElementHeight';
import style from '../Header/Header.module.scss';

import { useTheme as useSetTheme } from '@/src/utils/theme';

const menuList = [
  {
    title: 'about',
    href: '/',
  },
  {
    title: 'contact',
    href: '/',
  },
];

const Header = () => {
  const [elm, height] = useElementHeight();
  const [scroll, setScroll] = useState(0);

  const { theme, setTheme } = useSetTheme();

  const router = useRouter();

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    console.log(theme);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        ref={elm as React.RefObject<HTMLElement>}
        className={scroll > height ? style.container_scroll : style.container_default}
      >
        <div className={style.inner}>
          <IconContext.Provider value={{ color: '#151515', size: '25px' }}>
            <button className={style.icon_button} onClick={() => toggleTheme()}>
              <FaUserAlt />
            </button>
          </IconContext.Provider>

          <h1 className={style.title}>kitamago-log</h1>
          <ul className={style.list}>
            {menuList.map((elm, idx) => (
              <li key={idx}>
                <Link href={elm.href}>
                  <a>{elm.title}</a>
                </Link>
              </li>
            ))}
          </ul>

          <IconContext.Provider value={{ color: '#151515', size: '25px' }}>
            <button className={style.mail_button} onClick={() => router.push('/')}>
              <FaRegEnvelope />
            </button>
          </IconContext.Provider>
        </div>
      </header>
    </>
  );
};

export default Header;
