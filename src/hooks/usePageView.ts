import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { GA_ID, pageview } from '../utils/gtag';

// PV数をカウントするカスタムフック
export default function usePageView() {
  const router = useRouter();

  // SPAはページ遷移をJavaScriptでURLを書き換える事で実現してる
  // → Google Analyticsはアクセスした最初のページしかページビュー測定のイベントを送信しない
  useEffect(() => {
    if (GA_ID === undefined) {
      return;
    }

    const handleRouteChange = (path: string) => {
      pageview(path);
    };

    // RouterのURL書き換えが完了した時に発火するrouteChangeCompleteイベントの
    // コールバックとしてpageview関数を設定
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);
}
