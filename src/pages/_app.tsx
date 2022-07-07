import '../../styles/globals.scss';
import type { AppProps } from 'next/app';

import usePageView from '../hooks/usePageView';
import { GA_ID } from '../libs/gtag';

import GoogleAnalytics from '@/src/components/GoogleAnalytics/GoogleAnalytics';
import Layout from '@/src/components/Layout/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  usePageView();
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {GA_ID !== undefined && <GoogleAnalytics />}
    </>
  );
};

export default MyApp;
