import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

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
  const [queryClient] = useState(() => new QueryClient());

  return (
    <RecoilRoot>
      <ThemeProvider attribute="class">
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Head>
                <title>Subway Tour</title>
              </Head>
              <AuthCheck>
                <Component {...pageProps} />
              </AuthCheck>
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
