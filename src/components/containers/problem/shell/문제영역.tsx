import styled from 'styled-components';
// components
import Badge from 'components/presenters/problem/shell/Badge';
import ProblemBadge from 'components/atoms/ProblemBadge';
import Loading from 'components/atoms/Loading';
import ProblemContent from 'components/presenters/problem/shell/ProblemContent';
// api
import { useProblemQuery } from 'api/problem';
// styles
import { typo } from 'tds';

/**
 * 문제영역
 * @param props
 * @param props.problemId 문제 ID
 */
const 문제영역 = ({ problemId }: Props) => {
  const { status, data } = useProblemQuery({ problemId });

  const initRandomColor = (key: string) => {
    let h = key.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 360;
    return `hsl(${h}, 60%, 60%)`;
  };

  const problemType = data?.result
    ? data.result.level < 8
      ? 'Easy'
      : data.result.level < 11
      ? 'Normal'
      : 'Hard'
    : null;

  return (
    <Wrapper>
      {problemType && <ProblemBadge type={problemType}>LV.{data?.result.level}</ProblemBadge>}
      <TagWrapper>
        {data?.result.tags.map(tag => (
          <Tag key={tag} color={initRandomColor(tag)}>
            {tag}
          </Tag>
        ))}
      </TagWrapper>

      {status === 'success' && (
        <>
          <Badge text="문제 설명" />

          <ProblemContent problem={data?.result} />
        </>
      )}
      {status === 'loading' && <Loading />}
    </Wrapper>
  );
};

const Wrapper = styled.section``;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 32px;
`;

const Tag = styled.span<{ color: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid ${({ color }) => color};
  color: ${({ theme }) => theme.text.f2};
  ${typo.badge};
`;

type Props = {
  problemId: string;
};

export default 문제영역;
