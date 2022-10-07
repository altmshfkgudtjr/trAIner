import Head from "next/head";
// utils
import { SERVICE_LOGO_IMAGE_URL } from 'utils/constants/url';

/** Default 메타 데이터 */
const DefaultMeta = () => {
  return (
    <Head>
      <meta name="description" content={`나의 부동산 투자 포트폴리오, ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="keywords" content={`부동산, 리츠, 포트폴리오, 투자`} />
			<meta name="copyright" content={`Copyright © 2022 ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="author" content={process.env.NEXT_PUBLIC_BRAND_KOR} />
      {/* ------------------------ Default ------------------------ */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_DEFAULT_HOST} />
      <meta property="og:site_name" content={process.env.NEXT_PUBLIC_BRAND_KOR} />
      <meta property="og:title" content={`${process.env.NEXT_PUBLIC_BRAND_ENG} | 나의 부동산 투자 포트폴리오`} />
      <meta property="og:description" content={`나의 부동산 투자 포트폴리오, ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta property="og:image" content={`${SERVICE_LOGO_IMAGE_URL}/primary-simple.png`} />
      {/* ------------------------ Twitter ------------------------ */}
      <meta name="twitter:card" content={`나의 부동산 투자 포트폴리오, ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="twitter:domain" content={process.env.NEXT_PUBLIC_DEFAULT_HOST} />
      <meta name="twitter:title" content={`${process.env.NEXT_PUBLIC_BRAND_ENG} | 나의 부동산 투자 포트폴리오`} />
      <meta name="twitter:description" content={`나의 부동산 투자 포트폴리오, ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="twitter:image" content={`${SERVICE_LOGO_IMAGE_URL}/primary-simple.png`} />
      {/* ------------------------ Facebook ----------------------- */}
      <meta name="facebook:card" content={`나의 부동산 투자 포트폴리오, ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="twitter:domain" content={process.env.NEXT_PUBLIC_DEFAULT_HOST} />
      <meta name="facebook:title" content={`${process.env.NEXT_PUBLIC_BRAND_ENG} | 나의 부동산 투자 포트폴리오`} />
      <meta name="facebook:description" content={`나의 부동산 투자 포트폴리오, ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="facebook:image" content={`${SERVICE_LOGO_IMAGE_URL}/primary-simple.png`} />
    </Head>
  );
};

export default DefaultMeta;
