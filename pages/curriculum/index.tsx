import styled from 'styled-components';
import { useRecoilValue } from 'store';
// components
import { DashboardLayout } from 'tds/layouts';
import Layout from 'components/layouts';
import ProblemCard from 'components/presenters/cards/ProblemCard';
import Loading from 'components/atoms/Loading';
// api
import { useCurriculumQuery, useSolvedProblemQuery, useHotUserProblemQuery } from 'api/problem';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useAuthWall from 'hooks/commons/useAuthWall';
// styles
import { mediaQuery, typo } from 'tds';

/** 커리큘럼 페이지 */
const CurriculumPage = () => {
  const user = useRecoilValue(state => state.user.default);

  const { MetaTitle } = useMetaData();
  const { ValidAuthProvider } = useAuthWall({ isRedirect: true });

  const { data: solvedProblem, isLoading: isLoadingSolvedProblem } = useSolvedProblemQuery({
    options: {
      enabled: !!user?.userId,
    },
  });
  const { data: curriculum, isLoading: isLoadingCurriculum } = useCurriculumQuery({
    problemId: solvedProblem?.result.problemId ?? '',
    count: 10,
    options: {
      enabled: !!solvedProblem?.result,
    },
  });
  const { data: similarProblemList, isLoading: isLoadingSimilar } = useHotUserProblemQuery({
    type: 'similar',
  });
  const { data: wrongProblemList, isLoading: isLoadingWrong } = useHotUserProblemQuery({
    type: 'vulnerable',
  });
  const { data: unfamiliarProblemList, isLoading: isLoadingUnfamiliar } = useHotUserProblemQuery({
    type: 'unfamiliar',
  });
  const { data: clickProblemList, isLoading: isLoadingClick } = useHotUserProblemQuery({
    type: 'click',
  });

  return (
    <>
      <MetaTitle content="커리큘럼" />

      <ValidAuthProvider>
        <Wrapper>
          <section>
            <Title>방금 내가 풀었던 문제</Title>

            <CardWrapper>
              {isLoadingSolvedProblem && <Loading />}
              {!!solvedProblem?.result && <ProblemCard problem={solvedProblem.result} />}
            </CardWrapper>
          </section>

					<section>
            <Title>커리큘럼 문제 추천</Title>

            <CardWrapper>
              {isLoadingCurriculum && <Loading />}
              {curriculum?.result?.map(problem => (
                <ProblemCard key={problem.problemId} problem={problem} />
              )) ?? null}
            </CardWrapper>
          </section>

          <section>
            <Title>방금 풀었던 문제랑 비슷한 유형</Title>

            <CardWrapper>
              {isLoadingSimilar && <Loading />}
              {similarProblemList?.result?.map(problem => (
                <ProblemCard key={problem.problemId} problem={problem} />
              )) ?? null}
            </CardWrapper>
          </section>

          <section>
            <Title>내가 틀릴 가능성이 높은 문제</Title>

            <CardWrapper>
              {isLoadingWrong && <Loading />}
              {wrongProblemList?.result?.map(problem => (
                <ProblemCard key={problem.problemId} problem={problem} />
              )) ?? null}
            </CardWrapper>
          </section>

          <section>
            <Title>내가 풀어보지 않았던 유형별 문제</Title>

            <CardWrapper>
              {isLoadingUnfamiliar && <Loading />}
              {unfamiliarProblemList?.result?.map(problem => (
                <ProblemCard key={problem.problemId} problem={problem} />
              )) ?? null}
            </CardWrapper>
          </section>

          <section>
            <Title>내가 흥미로울 것 같은 문제</Title>

            <CardWrapper>
              {isLoadingClick && <Loading />}
              {clickProblemList?.result?.map(problem => (
                <ProblemCard key={problem.problemId} problem={problem} />
              )) ?? null}
            </CardWrapper>
          </section>
        </Wrapper>
      </ValidAuthProvider>
    </>
  );
};

CurriculumPage.getLayout = page => {
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

export default CurriculumPage;
