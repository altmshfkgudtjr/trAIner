import styled from 'styled-components';
// components
import Badge from 'components/presenters/problem/shell/Badge';
import ProblemTitle from 'components/presenters/problem/shell/ProblemTitle';
import ProblemContent from 'components/presenters/problem/shell/ProblemContent';
// api
import { useProblemQuery } from 'api/problem';

/**
 * 문제영역
 * @param props
 * @param props.problemId 문제 ID
 */
const 문제영역 = ({ problemId }: Props) => {
  const { status, data } = useProblemQuery({ problemId });

  return (
    <Wrapper>
      {status === 'success' && (
        <>
          <TitleWrapper>
            <ProblemTitle title={data?.result?.titleKo} />
          </TitleWrapper>

          <Badge text="문제 설명" />

          <ProblemContent problem={data?.result} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section``;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 16px;
`;

type Props = {
  problemId: string;
};

export default 문제영역;
