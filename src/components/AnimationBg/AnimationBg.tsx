import style from "./AnimationBg.module.scss";
import React from "react";
import Image from "next/image";

const AnimationBg: React.FC = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.cityIconStyle}>
            <img src="/image/City.png" width="200" height="200" alt="" />
          </div>
          <div className={style.ReadingPeopleIconStyle}>
            <img src="/image/education.png" width="180" height="180" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimationBg;
