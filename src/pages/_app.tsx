import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ThemeProvider attribute="class">
        <SessionProvider session={pageProps.session}>
          <Layout>
            <Head>
              <title>Subway Tour</title>
            </Head>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
