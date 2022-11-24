import styled from 'styled-components';
// components
import Layout from 'components/layouts';
import Loading from 'components/atoms/Loading';
import SolvedProblemCard from 'components/presenters/cards/SolvedProblemCard';
// api
import { useSolvedProblemQuery } from 'api/problem';
// styles
import { mediaQuery, typo } from 'tds';

/** 마이페이지 */
const ProfilePage = () => {
  const { data: solvedProblemList, isLoading: isLoadingSolvedProblem } = useSolvedProblemQuery({
    skip: 0,
    limit: 30,
  });

  return (
    <Wrapper>
      <section>
        <Title>내 제출 이력</Title>
        <CardWrapper>
          {isLoadingSolvedProblem && <Loading />}
          {solvedProblemList?.result?.map(problem => (
            <SolvedProblemCard key={problem.problemId} problem={problem} />
          ))}
        </CardWrapper>
      </section>
    </Wrapper>
  );
};

ProfilePage.getLayout = page => {
  return <Layout profile={page.props.profile}>{page}</Layout>;
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1080px;
  padding-top: 16px;
  padding-bottom: 200px;
  margin: auto;

  ${mediaQuery.medium} {
    padding-top: 40px;
  }
`;

const Title = styled.h1`
  padding: 0 16px;
  margin-bottom: 24px;
  ${typo.headline1};
  color: ${({ theme }) => theme.text.f1};

  ${mediaQuery.medium} {
    padding: 0 24px;
    margin-bottom: 48px;
    ${typo.Big1};
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 0 16px;

  ${mediaQuery.medium} {
    display: flex;
    flex-direction: column;
    padding: 0 24px;
  }
`;

export default ProfilePage;
