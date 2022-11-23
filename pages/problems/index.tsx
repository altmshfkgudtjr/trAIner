import styled, { css } from 'styled-components';
import { useRecoilValue } from 'store';
import Link from 'next/link';
// components
import { DashboardLayout } from 'tds/layouts';
import Layout from 'components/layouts';
import ProblemCard from 'components/presenters/cards/ProblemCard';
import GroupCard from 'components/presenters/cards/GroupCard';
import Loading from 'components/atoms/Loading';
// api
import { useColdUserProblemQuery } from 'api/problem';
import {
  useCurriculumQuery,
  useLastlySolvedProblemQuery,
  useHotUserProblemQuery,
} from 'api/problem';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useAuthWall from 'hooks/commons/useAuthWall';
// utils
import { algorithm } from 'utils/constants/algorithm';
// styles
import { mediaQuery, typo, lib } from 'tds';

/** 문제 목록 페이지 */
const ProlbemListPage = () => {
  const { MetaTitle } = useMetaData();
  const { ValidAuthProvider } = useAuthWall({ isRedirect: true });
  const user = useRecoilValue(state => state.user.default);

  const { data: solvedProblem, isLoading: isLoadingSolvedProblem } = useLastlySolvedProblemQuery({
    options: {
      enabled: !!user?.userId,
    },
  });
  const { data: curriculum, isLoading: isLoadingCurriculum } = useCurriculumQuery({
    problemId: solvedProblem?.result.problemId ?? '',
    count: 30,
    options: {
      enabled: !!solvedProblem?.result,
    },
  });
  const { data: similarProblemList, isLoading: isLoadingSimilar } = useHotUserProblemQuery({
    type: 'similar',
    count: 30,
  });
  const { data: vulerableProblemList, isLoading: isLoadingVulnerable } = useHotUserProblemQuery({
    type: 'vulnerable',
    count: 30,
  });
  const { data: unfamiliarProblemList, isLoading: isLoadingUnfamiliar } = useHotUserProblemQuery({
    type: 'unfamiliar',
    count: 30,
  });
  const { data: clickProblemList, isLoading: isLoadingClick } = useHotUserProblemQuery({
    type: 'click',
    count: 30,
  });
  const { data: wrongProblemList, isLoading: isLoadingWrong } = useColdUserProblemQuery({
    type: 'vulnerable',
    count: 30,
  });
  const { data: popularProblemList, isLoading: isLoadingPopular } = useColdUserProblemQuery({
    type: 'popular',
    count: 30,
  });
  const { data: trialProblemList, isLoading: isLoadingTrial } = useColdUserProblemQuery({
    type: 'click',
    count: 30,
  });

  return (
    <>
      <MetaTitle content="추천 문제" />

      <ValidAuthProvider>
        <Wrapper>
          <section>
            <Title>
              {!isLoadingSolvedProblem && (
                <>
                  최근에 푼
                  <Link href={`/problem/${solvedProblem?.result.problemId}`}>
                    <mark className="noselect">{solvedProblem?.result.titleKo}</mark>
                  </Link>
                  과 관련된 문제들이에요!
                </>
              )}
            </Title>

            <CardWrapper>
              {isLoadingCurriculum && <Loading />}
              {curriculum?.result?.map(problem => (
                <ProblemCard key={problem.problemId} problem={problem} />
              )) ?? null}
            </CardWrapper>
          </section>

          <section>
            <Title>최근에 풀었던 문제들과 연관도가 높아요</Title>

            <CardWrapper>
              {isLoadingSimilar && <Loading />}
              {similarProblemList?.result?.map(problem => (
                <ProblemCard key={problem.problemId} problem={problem} />
              )) ?? null}
            </CardWrapper>
          </section>

          <section>
            <Title>알고리즘 집중 트레이닝</Title>

            <CardWrapper>
              <GroupCard content="dp" name={algorithm['dp']} />
              <GroupCard content="data_structures" name={algorithm['data_structures']} />
              <GroupCard content="greedy" name={algorithm['greedy']} />
              <GroupCard content="graph_traversal" name={algorithm['graph_traversal']} />
              <GroupCard content="trees" name={algorithm['trees']} />
              <GroupCard content="bfs" name={algorithm['bfs']} />
              <GroupCard content="dfs" name={algorithm['dfs']} />
              <GroupCard content="topological_sorting" name={algorithm['topological_sorting']} />
              <GroupCard content="floyd_warshall" name={algorithm['floyd_warshall']} />
              <GroupCard content="dijkstra" name={algorithm['dijkstra']} />
              <GroupCard content="backtracking" name={algorithm['backtracking']} />
              <GroupCard content="divide_and_conquer" name={algorithm['divide_and_conquer']} />
              <GroupCard content="stack" name={algorithm['stack']} />
              <GroupCard content="queue" name={algorithm['queue']} />
              <GroupCard content="bellman_ford" name={algorithm['bellman_ford']} />
              <GroupCard content="implementation" name={algorithm['implementation']} />
              <GroupCard content="graphs" name={algorithm['graphs']} />
              <GroupCard content="string" name={algorithm['string']} />
              <GroupCard content="bruteforcing" name={algorithm['bruteforcing']} />
              <GroupCard content="sorting" name={algorithm['sorting']} />
              <GroupCard content="number_theory" name={algorithm['number_theory']} />
              <GroupCard content="geometry" name={algorithm['geometry']} />
              <GroupCard content="segtree" name={algorithm['segtree']} />
              <GroupCard content="binary_search" name={algorithm['binary_search']} />
              <GroupCard content="math" name={algorithm['math']} />
              <GroupCard content="regex" name={algorithm['regex']} />
              <GroupCard content="bitmask" name={algorithm['bitmask']} />
              <GroupCard content="combinatorics" name={algorithm['combinatorics']} />
              <GroupCard content="knapsack" name={algorithm['knapsack']} />
              <GroupCard content="mst" name={algorithm['mst']} />
              <GroupCard content="priority_queue" name={algorithm['priority_queue']} />
              <GroupCard content="sieve" name={algorithm['sieve']} />
              <GroupCard content="prefix_sum" name={algorithm['prefix_sum']} />
            </CardWrapper>
          </section>

          <section>
            <Title>AI의 취약점 예측 진단 문제집</Title>

            <CardWrapper>
              {isLoadingVulnerable && <Loading />}
              {vulerableProblemList?.result?.map(problem => (
                <ProblemCard key={problem.problemId} problem={problem} />
              )) ?? null}
            </CardWrapper>
          </section>

          <section>
            <Title>잊고 있었던 문제 유형들</Title>

            <CardWrapper>
              {isLoadingUnfamiliar && <Loading />}
              {unfamiliarProblemList?.result?.map(problem => (
                <ProblemCard key={problem.problemId} problem={problem} />
              )) ?? null}
            </CardWrapper>
          </section>

          <section>
            <Title>당신을 위한 맞춤 문제 피드</Title>

            <CardWrapper>
              {isLoadingClick && <Loading />}
              {clickProblemList?.result?.map(problem => (
                <ProblemCard key={problem.problemId} problem={problem} />
              )) ?? null}
            </CardWrapper>
          </section>

          {!!wrongProblemList?.result && (
            <section>
              <Title>생각보다 많이 틀리는 문제들</Title>

              <CardWrapper>
                {isLoadingWrong && <Loading />}
                {wrongProblemList?.result?.map(problem => (
                  <ProblemCard key={problem.problemId} problem={problem} />
                ))}
              </CardWrapper>
            </section>
          )}

          {!!popularProblemList?.result && (
            <section>
              <Title>많은 유저들에게 사랑받고 있는 문제</Title>

              <CardWrapper>
                {isLoadingPopular && <Loading />}
                {popularProblemList?.result?.map(problem => (
                  <ProblemCard key={problem.problemId} problem={problem} />
                ))}
              </CardWrapper>
            </section>
          )}

          {!!trialProblemList?.result && (
            <section>
              <Title>AI의 추천! 유저들의 예측 클릭률이 높아요</Title>

              <CardWrapper>
                {isLoadingTrial && <Loading />}
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
    margin-bottom: 48px;
  }

  ${mediaQuery.medium} {
    padding-top: 128px;

    & > section {
      margin-bottom: 120px;
    }
  }
`;

const Title = styled.h1`
  padding: 0 16px;
  margin-bottom: 12px;
  ${typo.headline1};
  color: ${({ theme }) => theme.text.f1};

  mark {
    display: inline-block;
    padding: 4px 8px;
    margin: 0 8px 0 16px;
    background-color: ${({ theme }) => theme.semantic.info};
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.1s ease;

    ${lib.onlyHover(css`
      background-color: #0e60c2;
    `)}
  }

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
