import Head from 'next/head';

/**
 * 메타 데이터 Hook
 */
const useMetaData = () => {
  const MetaTitle = ({ content, showBrandName = true }) => {
    let title = content ? content : '';
    title += showBrandName
      ? content
        ? ` - ${process.env.NEXT_PUBLIC_BRAND_KOR}`
        : process.env.NEXT_PUBLIC_BRAND_KOR
      : '';
    title = title ? title : process.env.NEXT_PUBLIC_BRAND_KOR;

    return (
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="facebook:title" content={title} />
      </Head>
    );
  };

  const MetaDescription = ({ content }) => (
    <Head>
      <meta name="description" content={content} />
      <meta property="og:descripction" content={content} />
      <meta name="twitter:description" content={content} />
      <meta name="facebook:description" content={content} />

      <meta name="twitter:card" content={content} />
      <meta name="facebook:card" content={content} />
    </Head>
  );

  const MetaImage = ({ content }) => (
    <Head>
      <meta property="og:image" content={content} />
      <meta name="twitter:image" content={content} />
      <meta name="facebook:image" content={content} />
    </Head>
  );

  return {
    MetaTitle,
    MetaDescription,
    MetaImage,
  };
};

export default useMetaData;
