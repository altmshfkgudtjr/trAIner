/** Default 메타 데이터 */
const DefaultMeta = () => {
  return (
    // eslint-disable-next-line @next/next/no-head-element
    <head>
      {/* ------------------------ Favicons ------------------------ */}
			<link rel="shortcut icon" href="/favicons/favicon.ico" />
			<link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
			<link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
			<link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
			<link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
			<link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
			<link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
			<link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
			<link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
			<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
			<link rel="icon" type="image/png" sizes="192x192"  href="/favicons/android-icon-192x192.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
			<meta name="msapplication-TileColor" content="#ffffff" />
			<meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
			<meta name="theme-color" content="#ffffff" />
			<link rel="manifest" href="/manifest.json" />
      {/* ------------------------ Common ------------------------ */}
			<title>{process.env.NEXT_PUBLIC_BRAND_KOR}</title>
      <meta name="description" content={`너무 어려운 코딩 공부, 인공지능이 직접 로드맵을 짜주며, 초개인화 맞춤 학습을 추천합니다., ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="keywords" content={`코딩, 인공지능, 로드맵, 개발`} />
			<meta name="copyright" content={`Copyright © 2022 ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="author" content={process.env.NEXT_PUBLIC_BRAND_KOR} />
      {/* ------------------------ Default ------------------------ */}
			<meta property="og:locale" content="ko_KR" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_DEFAULT_HOST} />
      <meta property="og:site_name" content={process.env.NEXT_PUBLIC_BRAND_KOR} />
      <meta property="og:title" content={process.env.NEXT_PUBLIC_BRAND_KOR} />
      <meta property="og:description" content={`너무 어려운 코딩 공부, 인공지능이 직접 로드맵을 짜주며, 초개인화 맞춤 학습을 추천합니다., ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta property="og:image" content={`logo/primary-simple.png`} />
      {/* ------------------------ Twitter ------------------------ */}
      <meta name="twitter:card" content={`너무 어려운 코딩 공부, 인공지능이 직접 로드맵을 짜주며, 초개인화 맞춤 학습을 추천합니다., ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="twitter:domain" content={process.env.NEXT_PUBLIC_DEFAULT_HOST} />
      <meta name="twitter:title" content={process.env.NEXT_PUBLIC_BRAND_KOR} />
      <meta name="twitter:description" content={`너무 어려운 코딩 공부, 인공지능이 직접 로드맵을 짜주며, 초개인화 맞춤 학습을 추천합니다., ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="twitter:image" content={`logo/primary-simple.png`} />
      {/* ------------------------ Facebook ----------------------- */}
      <meta name="facebook:card" content={`너무 어려운 코딩 공부, 인공지능이 직접 로드맵을 짜주며, 초개인화 맞춤 학습을 추천합니다., ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="twitter:domain" content={process.env.NEXT_PUBLIC_DEFAULT_HOST} />
      <meta name="facebook:title" content={process.env.NEXT_PUBLIC_BRAND_KOR} />
      <meta name="facebook:description" content={`너무 어려운 코딩 공부, 인공지능이 직접 로드맵을 짜주며, 초개인화 맞춤 학습을 추천합니다., ${process.env.NEXT_PUBLIC_BRAND_KOR}`} />
      <meta name="facebook:image" content={`logo/primary-simple.png`} />
    </head>
  );
};

export default DefaultMeta;
