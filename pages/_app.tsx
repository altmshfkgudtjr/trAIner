import Head from 'next/head';
import { useState, useEffect } from 'react';
// head
import GoogleTagManager from 'lib/head/GoogleTagManager';
// components
import ErrorBoundary from 'components/containers/commons/ErrorBoundary';
import {
  QueryProvider,
  RecoilProvider,
  ThemeProvider,
  ModalProvider,
  AuthProvider,
} from 'components/containers/commons/providers';
import { SpriteIcons, SpriteEmojis } from 'ruix/components/icons';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useGoogleTagManager from 'hooks/event/useGoogleTagManager';
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
  useGoogleTagManager();

  /** 공통 레이아웃 적용 */
  const getLayout = Component.getLayout || (page => page);

  useEffect(() => {
    const value = cookieUtils.getCookieFromClient('theme');
    setThemeType(v => (v ? v : value));
  }, []);

  return (
    <>
      <GoogleTagManager nonce={pageProps.nonce} />
      {/* ------------------------------ Head ------------------------------ */}
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=yes, minimal-ui, viewport-fit=cover, shrink-to-fit=no"
        />
      </Head>
      <MetaTitle content={`나의 부동산 투자 포트폴리오`} />
      {/* ------------------------------ Main ------------------------------ */}
      <QueryProvider>
        <AuthProvider>
          <RecoilProvider>
            <ThemeProvider themeType={themeType}>
              {/* Style */}
              <GlobalStyles />
              {/* App */}
              <ErrorBoundary>{getLayout(<Component {...pageProps} />)}</ErrorBoundary>
              {/* Modal */}
              <ModalProvider />
            </ThemeProvider>
          </RecoilProvider>
        </AuthProvider>
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
  ctx?.res?.setHeader(
    'Content-Security-Policy',
    [
      [
        'script-src',
        'self',
        process.env.NODE_ENV === 'production' ? '' : 'unsafe-eval',
        '',
        `nonce-${nonce}`,
        'https://*.googletagmanager.com',
        'https://*.googleapis.com',
        'https://*.tinymce.com',
        'https://*.tiny.cloud',
      ],
      [
        'connect-src',
        'self',
        'http://*.run.app',
        'http://*.seoulpi.io',
        'https://*.google-analytics.com',
        'https://*.googleapis.com',
        'https://*.tinymce.com',
        'https://*.tiny.cloud',
      ],
    ].reduce((prev, [key, ...policy]) => {
      return `${prev}${key} ${policy
        .filter(Boolean)
        .map(src => (src.startsWith('http') ? `${src}` : `'${src}'`))
        .join(' ')};`;
    }, ''),
  );
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
