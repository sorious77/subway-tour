import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ThemeProvider attribute="class">
        <Layout>
          <Head>
            <title>Subway Tour</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
