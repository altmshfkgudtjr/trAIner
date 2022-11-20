import styled from 'styled-components';
import { useRouter } from 'next/router';
// components
import { DashboardLayout } from 'tds/layouts';
import Layout from 'components/layouts';
import ProblemCard from 'components/presenters/cards/ProblemCard';
// api
import { useColdUserProblemQuery } from 'api/problem';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useAuthWall from 'hooks/commons/useAuthWall';
// utils
import { algorithm } from 'utils/constants/algorithm';
// styles
import { mediaQuery, typo } from 'tds';
// types
import type { Algorithm } from 'types/api/problem';

/** 문제그룹 페이지 */
const ProblemGroupPage = () => {
  const { query } = useRouter();
  const algorithmType = query.algorithmType as Algorithm;

  const { MetaTitle } = useMetaData();
  const { ValidAuthProvider } = useAuthWall({ isRedirect: true });

  const { data: problemList } = useColdUserProblemQuery({
    type: 'algorithm',
    content: algorithmType,
  });

  return (
    <>
      <MetaTitle content={algorithm[algorithmType]} />

      <ValidAuthProvider>
        <Wrapper>
          {!!problemList?.result && (
            <section>
              <Title>{algorithm[algorithmType]}</Title>

              <CardWrapper>
                {problemList?.result?.map(problem => (
                  <ProblemCard key={problem.problemId} problem={problem} flexible />
                ))}
              </CardWrapper>
            </section>
          )}
        </Wrapper>
      </ValidAuthProvider>
    </>
  );
};

ProblemGroupPage.getLayout = page => {
  return <Layout profile={page.props.profile}>{page}</Layout>;
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
  padding: 0 16px;
  margin-bottom: 12px;
  ${typo.headline1};
  color: ${({ theme }) => theme.text.f1};

  ${mediaQuery.medium} {
    padding: 0 24px;
    margin-bottom: 24px;
    ${typo.Big1};
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  padding: 0 16px;

  ${mediaQuery.medium} {
    grid-template-columns: repeat(auto-fill, minmax(300px, auto));
    padding: 0 24px;
  }
`;

export default ProblemGroupPage;
