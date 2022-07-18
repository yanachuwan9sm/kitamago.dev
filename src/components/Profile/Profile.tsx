import Image from 'next/image';
import React from 'react';

import style from './Profile.module.scss';

const Profile = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.profileimage}>
        <Image src="/image/icon.png" layout="fill" objectFit="contain" alt="kitamagoのプロフィール画像" />
      </div>
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
