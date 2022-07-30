import 'ress';
import type { AppProps } from 'next/app';
import Script from 'next/script';

import usePageView from '../hooks/usePageView';
import { GA_ID } from '../utils/gtag';
import { ThemeProvider } from '../utils/theme';

import { GlobalStyle } from './ThemeConfig';

const MyApp = ({ Component, pageProps }: AppProps) => {
  usePageView();
  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>

      {/* </ThemeProvider> */}
      {GA_ID !== undefined && (
        <>
          <Script defer src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga" defer strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}');
          `}
          </Script>
        </>
      )}
    </>
  );
};

export default MyApp;
