import styled from 'styled-components';
// components
import Layout from 'components/layouts';
import { DashboardLayout } from 'tds/layouts';
// hooks
import useMetaData from 'hooks/commons/useMetaData';

/** 대시보드 페이지 */
const CurriculumPage = () => {
  const { MetaTitle } = useMetaData();

  return (
    <>
      <MetaTitle content="대시보드" />

      <Wrapper></Wrapper>
    </>
  );
};

CurriculumPage.getLayout = page => {
  return <Layout isSide>{page}</Layout>;
};

const Wrapper = styled(DashboardLayout)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;
`;

export default CurriculumPage;
