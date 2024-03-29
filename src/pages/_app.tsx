import Layout from "@/components/layout";
import { store } from "@/store";
import "@/styles/global.css";
import { theme } from "@/utils/theme";
import { ThemeProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import NextNProgress from 'nextjs-progressbar';
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            <NextNProgress color="pink" />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
