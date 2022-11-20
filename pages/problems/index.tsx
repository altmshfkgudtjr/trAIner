import styled from 'styled-components';
// components
import { DashboardLayout } from 'tds/layouts';
import Layout from 'components/layouts';
import ProblemCard from 'components/presenters/cards/ProblemCard';
import GroupCard from 'components/presenters/cards/GroupCard';
// api
import { useColdUserProblemQuery } from 'api/problem';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useAuthWall from 'hooks/commons/useAuthWall';
// utils
import { algorithm } from 'utils/constants/algorithm';
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
