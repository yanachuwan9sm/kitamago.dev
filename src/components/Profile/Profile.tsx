import Image from 'next/image';
import React from 'react';

import style from './Profile.module.scss';

const Profile = () => {
  return (
    <div className={style.wrapper}>
      <img className={style.profileimage} src="/image/icon.png" width={100} height={100} />
      <div className={style.profilename}>kitamago</div>
      <div className={style.profilejob}>Frontend Engineer</div>
      <div className={style.profiletext}>
        C#エンジニア → 地方のフロントエンドエンジニアに転生しました。 React / Next.js / TypeScript
        辺りの技術が好きです。
      </div>
    </div>
  );
};

export default Profile;
