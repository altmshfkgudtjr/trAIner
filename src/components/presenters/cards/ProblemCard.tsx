import styled, { css } from 'styled-components';
import Link from 'next/link';
// components
import ProblemBadge from 'components/atoms/ProblemBadge';
// styles
import { typo, mediaQuery, lib } from 'tds';
// types
import type { Problem } from 'types/api/problem';

/**
 * 문제 카드
 */
const ProblemCard = ({ problem }: Props) => {
  const initRandomColor = (key: string) => {
    let h = key.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 360;
    return `hsl(${h}, 50%, 62%)`;
  };

  return (
    <Link href={`/problem/${problem.problemId}`}>
      <Wrapper>
        <ProblemBadge type={problem.level < 8 ? 'Easy' : problem.level < 11 ? 'Normal' : 'Hard'}>
          {problem.problemId}
        </ProblemBadge>
        <br />
        {problem.titleKo}
        <br />
        {problem.tags.length > 0 && (
          <TagWrapper>
            {problem.tags.map(tag => (
              <Tag key={tag} color={initRandomColor(tag)}>
                {tag}
              </Tag>
            ))}
          </TagWrapper>
        )}
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.div<{ color?: string }>`
  position: relative;
  display: inline-block;
  width: 240px;
  height: 240px;
  padding: 16px;
  border-radius: 4px;
  background-color: ${({ color, theme }) => color ?? theme.background.bg4};
  ${typo.headline3};
  color: ${({ theme }) => theme.text.f1};
  word-break: keep-all;
  overflow: hidden;
  ${lib.textLineClamp(5)};

  ${mediaQuery.medium} {
    width: 300px;
    height: 300px;
    padding: 24px;
    border-radius: 8px;
    ${typo.headline1};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    pointer-events: none;
    opacity: 0;
  }

  ${lib.onlyHover(css`
    &::after {
      opacity: 0.1;
    }
  `)};
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
`;

const Tag = styled.span<{ color: string }>`
  display: inline-block;
  padding: 3px 6px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
  color: ${({ theme }) => theme.text.f2};
  ${typo.badge};
`;

type Props = {
  problem: Problem;
};

export default ProblemCard;
