import styled from 'styled-components';
// components
import { DashboardLayout } from 'tds/layouts';
import Layout from 'components/layouts';
import ProblemCard from 'components/presenters/cards/ProblemCard';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useAuthWall from 'hooks/commons/useAuthWall';
// styles
import { mediaQuery, typo } from 'tds';

/** 대시보드 페이지 */
const CurriculumPage = () => {
  const { MetaTitle } = useMetaData();
  // const { ValidAuthProvider } = useAuthWall({ isRedirect: true });

  return (
    <>
      <MetaTitle content="대시보드" />

      {/* <ValidAuthProvider> */}
      <Wrapper>
        <section>
          <Title>방금 내가 풀었던 문제</Title>
          <ProblemCard problem={{ id: '5597', title: '과제 안 내신 분..?' }} />
        </section>

        <section>
          <Title>이런 문제는 어떤가요?</Title>
        </section>
      </Wrapper>
      {/* </ValidAuthProvider> */}
    </>
  );
};

CurriculumPage.getLayout = page => {
  return <Layout profile={page.props.profie}>{page}</Layout>;
};

const Wrapper = styled(DashboardLayout)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 32px;

  & > section {
    margin-bottom: 32px;
  }

  ${mediaQuery.medium} {
    padding-top: 128px;

    & > section {
      margin-bottom: 64px;
    }
  }
`;

const Title = styled.h1`
  margin-bottom: 12px;
  ${typo.headline1};
  color: ${({ theme }) => theme.text.f1};

  ${mediaQuery.medium} {
    margin-bottom: 24px;
    ${typo.Big1};
  }
`;

export default CurriculumPage;
