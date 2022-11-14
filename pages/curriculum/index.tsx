import styled from 'styled-components';
import { useRecoilValue } from 'store';
// components
import { DashboardLayout } from 'tds/layouts';
import Layout from 'components/layouts';
import ProblemCard from 'components/presenters/cards/ProblemCard';
// api
import { useSolvedProblemQuery, useHotUserProblemQuery } from 'api/problem';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useAuthWall from 'hooks/commons/useAuthWall';
// styles
import { mediaQuery, typo } from 'tds';

/** 커리큘럼 페이지 */
const CurriculumPage = () => {
  const user = useRecoilValue(state => state.user.default);

  const { MetaTitle } = useMetaData();
  // const { ValidAuthProvider } = useAuthWall({ isRedirect: true });

  const { data: solvedProblem } = useSolvedProblemQuery({
    options: {
      enabled: !!user?.userId,
    },
  });
  const useHotUserProblemOptions = { enabled: !!solvedProblem?.result?.problemId };
  const { data: clickProblemList } = useHotUserProblemQuery({
    problemId: solvedProblem?.result?.[0].problemId as string,
    type: 'click',
    options: useHotUserProblemOptions,
  });
  const { data: similarProblemList } = useHotUserProblemQuery({
    problemId: solvedProblem?.result?.[0].problemId as string,
    type: 'similar',
    options: useHotUserProblemOptions,
  });
  const { data: unfamiliarProblemList } = useHotUserProblemQuery({
    problemId: solvedProblem?.result?.[0].problemId as string,
    type: 'unfamiliar',
    options: useHotUserProblemOptions,
  });
  const { data: wrongProblemList } = useHotUserProblemQuery({
    problemId: solvedProblem?.result?.[0].problemId as string,
    type: 'wrong',
    options: useHotUserProblemOptions,
  });

  return (
    <>
      <MetaTitle content="커리큘럼" />

      {/* <ValidAuthProvider> */}
      <Wrapper>
        {!!solvedProblem?.result && (
          <section>
            <Title>방금 내가 풀었던 문제</Title>

            <CardWrapper>
              <ProblemCard problem={solvedProblem.result} />
            </CardWrapper>
          </section>
        )}

        {!!similarProblemList?.result && (
          <section>
            <Title>방금 풀었던 문제랑 비슷한 유형</Title>

            <CardWrapper>
              {similarProblemList?.result?.map(problem => (
                <ProblemCard key={problem.problemId} problem={problem} />
              ))}
            </CardWrapper>
          </section>
        )}

        {!!wrongProblemList?.result && (
          <section>
            <Title>내가 틀릴 가능성이 높은 문제</Title>

            <CardWrapper>
              {wrongProblemList?.result?.map(problem => (
                <ProblemCard key={problem.problemId} problem={problem} />
              ))}
            </CardWrapper>
          </section>
        )}

        {!!unfamiliarProblemList?.result && (
          <section>
            <Title>내가 풀어보지 않았던 유형별 문제</Title>

            <CardWrapper>
              {unfamiliarProblemList?.result?.map(problem => (
                <ProblemCard key={problem.problemId} problem={problem} />
              ))}
            </CardWrapper>
          </section>
        )}

        {!!clickProblemList?.result && (
          <section>
            <Title>내가 흥미로울 것 같은 문제</Title>

            <CardWrapper>
              {clickProblemList?.result?.map(problem => (
                <ProblemCard key={problem.problemId} problem={problem} />
              ))}
            </CardWrapper>
          </section>
        )}
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

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  overflow-y: auto;
`;

export default CurriculumPage;
