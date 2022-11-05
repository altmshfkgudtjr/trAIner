import Head from 'next/head';
import { useState, useEffect } from 'react';
// components
import ErrorBoundary from 'components/containers/commons/ErrorBoundary';
import {
  QueryProvider,
  RecoilProvider,
  ThemeProvider,
  ModalProvider,
  SnackbarProvider,
} from 'providers';
import { SpriteIcons, SpriteEmojis } from 'tds/components/icons';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
// lib
import * as cookieUtils from 'utils/helpers/cookie';
import GlobalStyles from 'lib/GlobalStyles';
// utils
import { initRandomChar } from 'utils/random';
// styles
import 'public/font.css';
// types
import type { CustomAppProps } from 'next/app';

const App = ({ Component, pageProps }: CustomAppProps) => {
  const [themeType, setThemeType] = useState(pageProps.theme);

  const { MetaTitle } = useMetaData();

  /** 공통 레이아웃 적용 */
  const getLayout = Component.getLayout || (page => page);

  useEffect(() => {
    const value = cookieUtils.getCookieFromClient('theme');
    setThemeType(v => (v ? v : value));
  }, []);

  return (
    <>
      {/* ------------------------------ Head ------------------------------ */}
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=yes, minimal-ui, viewport-fit=cover, shrink-to-fit=no"
        />
      </Head>
      <MetaTitle content="트레이너" showBrandName={false} />
      {/* ------------------------------ Main ------------------------------ */}
      <QueryProvider>
        <RecoilProvider>
          <ThemeProvider themeType={themeType}>
            {/* Style */}
            <GlobalStyles />
            {/* App */}
            <ErrorBoundary>{getLayout(<Component {...pageProps} />)}</ErrorBoundary>
            {/* Modal */}
            <ModalProvider />
            {/* Snackbar */}
            <SnackbarProvider />
          </ThemeProvider>
        </RecoilProvider>
      </QueryProvider>
      {/* ------------------------------ Icons ------------------------------ */}
      <SpriteIcons />
      <SpriteEmojis />
    </>
  );
};

App.getInitialProps = async ({ ctx, Component }) => {
  let pageProps: any = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // CSP 설정
  const nonce = initRandomChar(12);
  Object.assign(pageProps, { nonce });

  // Theme 설정
  const cookie = ctx?.req?.cookies;
  if (cookie) {
    Object.assign(pageProps, {
      theme: cookieUtils.getCookieFromServer('theme', ctx),
    });
  }

  return { pageProps };
};

export default App;
