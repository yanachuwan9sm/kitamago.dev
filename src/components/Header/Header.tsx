import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { IconContext } from 'react-icons';
import { useElementHeight } from '../../hooks/useElementHeight';
import style from '../Header/Header.module.scss';

import { FaUserAlt } from 'react-icons/fa';
import { FaRegEnvelope } from 'react-icons/fa';
import { useRouter } from 'next/router';

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

const ProfileIcon = (onClick: () => void) => {
  return (
    <IconContext.Provider value={{ color: '#151515', size: '35px' }}>
      <button className={style.prevArrow} onClick={onClick}>
        <FaUserAlt />
      </button>
    </IconContext.Provider>
  );
};

const ContactIcon = (onClick: () => void) => {
  return (
    <IconContext.Provider value={{ color: '#151515', size: '35px' }}>
      <button className={style.prevArrow} onClick={onClick}>
        <FaRegEnvelope />
      </button>
    </IconContext.Provider>
  );
};

const Header = () => {
  const [elm, height] = useElementHeight();
  const [scroll, setScroll] = useState(0);

  const router = useRouter();

  const handleScroll = () => {
    setScroll(window.scrollY);
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
        className={scroll > height ? style.container_scroll : style.container_defalut}
      >
        <div className={style.inner}>
          <IconContext.Provider value={{ color: '#151515', size: '25px' }}>
            <button className={style.iconbutton} onClick={() => router.push('/')}>
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
            <button className={style.mailbutton} onClick={() => router.push('/')}>
              <FaRegEnvelope />
            </button>
          </IconContext.Provider>
        </div>
      </header>
    </>
  );
};

export default Header;
