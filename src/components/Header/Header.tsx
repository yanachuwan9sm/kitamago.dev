import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useElementHeight } from "../../hooks/useElementHeight";
import style from "../Header/Header.module.scss";

const menuList = [
  {
    title: "blog",
    href: "/",
  },
  {
    title: "about",
    href: "/",
  },
  {
    title: "contact",
    href: "/",
  },
];

const Header = () => {
  const [elm, height] = useElementHeight();
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        ref={elm as React.RefObject<HTMLElement>}
        className={
          scroll > height ? style.container_scroll : style.container_defalut
        }
      >
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
      </header>
    </>
  );
};

export default Header;
