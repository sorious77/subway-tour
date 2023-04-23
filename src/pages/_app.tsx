import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthCheck = ({ children }: any) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!isUser && router.pathname !== "/") router.push("/login");
  }, [router.isReady, status, isUser]);

  return children;
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ThemeProvider attribute="class">
        <SessionProvider session={pageProps.session}>
          <Layout>
            <Head>
              <title>Subway Tour</title>
            </Head>
            <AuthCheck>
              <Component {...pageProps} />
            </AuthCheck>
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
