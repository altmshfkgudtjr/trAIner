import styled from 'styled-components';
// components
import { DashboardLayout } from 'tds/layouts';
import Layout from 'components/layouts';
import ProblemCard from 'components/presenters/cards/ProblemCard';
// api
import { useColdUserProblemQuery } from 'api/problem';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useAuthWall from 'hooks/commons/useAuthWall';
// styles
import { mediaQuery, typo } from 'tds';

/** 문제 목록 페이지 */
const ProlbemListPage = () => {
  const { MetaTitle } = useMetaData();
  const { ValidAuthProvider } = useAuthWall({ isRedirect: true });

  const { data: wrongProblemList } = useColdUserProblemQuery({ type: 'vulnerable' });
  const { data: popularProblemList } = useColdUserProblemQuery({ type: 'popular' });
  const { data: trialProblemList } = useColdUserProblemQuery({ type: 'click' });

  return (
    <>
      <MetaTitle content="커리큘럼" />

      <ValidAuthProvider>
        <Wrapper>
          {!!wrongProblemList?.result && (
            <section>
              <Title>생각보다 많이 틀리는 문제</Title>

              <CardWrapper>
                {wrongProblemList?.result?.map(problem => (
                  <ProblemCard key={problem.problemId} problem={problem} />
                ))}
              </CardWrapper>
            </section>
          )}

          {!!popularProblemList?.result && (
            <section>
              <Title>요즘 유행하는 문제</Title>

              <CardWrapper>
                {popularProblemList?.result?.map(problem => (
                  <ProblemCard key={problem.problemId} problem={problem} />
                ))}
              </CardWrapper>
            </section>
          )}

          {!!trialProblemList?.result && (
            <section>
              <Title>많은 사람들이 풀어본 문제</Title>

              <CardWrapper>
                {trialProblemList?.result?.map(problem => (
                  <ProblemCard key={problem.problemId} problem={problem} />
                ))}
              </CardWrapper>
            </section>
          )}
        </Wrapper>
      </ValidAuthProvider>
    </>
  );
};

ProlbemListPage.getLayout = page => {
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
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  height: 240px;
  padding: 0 16px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  ${mediaQuery.medium} {
    height: 300px;
    padding: 0 24px;
  }
`;

export default ProlbemListPage;
