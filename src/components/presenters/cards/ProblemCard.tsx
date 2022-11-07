import styled from 'styled-components';
import Link from 'next/link';
// styles
import { typo, mediaQuery, lib } from 'tds';
// types
import type { Problem } from 'types/api/problem';

/**
 * 문제 카드
 */
const ProblemCard = ({ problem }: Props) => {
  const initRandomColor = () => {
    let h = problem.title.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 360;
    return `hsl(${h}, 50%, 62%)`;
  };

  return (
    <Link href={`/problem/${problem.id}`}>
      <Wrapper color={initRandomColor()}>{problem.title}</Wrapper>
    </Link>
  );
};

const Wrapper = styled.div<{ color: string }>`
  display: inline-block;
  width: 240px;
  height: 240px;
  padding: 24px;
  border-radius: 12px;
  background-color: ${({ color }) => color ?? `254°, 50%, 62%`};
  ${typo.headline1};
  font-size: 32px;
  word-break: break-all;
  ${lib.textLineClamp(4)};

  ${mediaQuery.medium} {
    width: 30d0px;
    height: 30d0px;
    padding: 32px;
    border-radius: 16px;
    ${typo.Big1};
  }
`;

type Props = {
  problem: Problem;
};

export default ProblemCard;
