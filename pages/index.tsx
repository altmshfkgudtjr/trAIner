import styled from 'styled-components';
// components
import Layout from 'components/layouts';

/** 홈 페이지 */
const HomePage = () => {
  return (
    <>
      <h1>trAIner</h1>
    </>
  );
};

HomePage.getLayout = page => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
