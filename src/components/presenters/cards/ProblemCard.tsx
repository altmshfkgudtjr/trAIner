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
  const problemType = problem.level < 8 ? 'Easy' : problem.level < 11 ? 'Normal' : 'Hard';

  const initRandomColor = (key: string) => {
    let h = key.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 360;
    return `hsl(${h}, 60%, 60%)`;
  };

  return (
    <Link href={`/problem/${problem.problemId}`}>
      <Wrapper>
        <BadgeWrapper>
          <ProblemBadge type={problemType}>LV.{problem.level}</ProblemBadge>
          문제번호: {problem.problemId}
        </BadgeWrapper>

        {problem.titleKo}
        {problem.tags.length > 0 && (
          <>
            <Name>분류</Name>
            <TagWrapper>
              {problem.tags.map(tag => (
                <Tag key={tag} color={initRandomColor(tag)}>
                  {tag}
                </Tag>
              ))}
            </TagWrapper>
          </>
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
  color: ${({ theme }) => theme.text.f2};
  word-break: keep-all;
  overflow: hidden;
  transition: 0.2s ease;
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
    background-color: black;
    pointer-events: none;
    opacity: 0;
    transition: 0.2s ease;
  }

  ${lib.onlyHover(css`
    &::after {
      opacity: 0.2;
    }
  `)};

  &:active {
    transform: scale(0.98, 0.98);
  }
`;

const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
  ${typo.badge};
  color: ${({ theme }) => theme.text.f4};
`;

const Name = styled.div`
  margin-top: 12px;
  ${typo.subtitle3};
  color: ${({ theme }) => theme.text.f4};
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
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
  problem: Problem;
};

export default ProblemCard;
