import type { AppProps } from "next/app";
import "../../styles/globals.scss";
import GoogleAnalytics from "../components/GoogleAnalytics/GoogleAnalytics";
import Layout from "../components/Layout/Layout";
import usePageView from "../hooks/usePageView";
import { GA_ID } from "../libs/gtag";

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
