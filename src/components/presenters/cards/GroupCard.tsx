import styled, { css } from 'styled-components';
import Link from 'next/link';
// styles
import { typo, mediaQuery, lib } from 'tds';

/**
 * 문제그룹 카드
 */
const GroupCard = ({ content, name }: Props) => {
  const initRandomGradient = key => {
    const hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];

    function populate(a) {
      for (var i = 0; i < 6; i++) {
        var x = Math.round(Math.random() * 14);
        var y = hexValues[x];
        a += y;
      }
      return a;
    }

    const newColor1 = populate('#');
    const newColor2 = populate('#');
    const angle = Math.round(
      ((key.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 360) / 360) * 360,
    );

    const gradient = 'linear-gradient(' + angle + 'deg, ' + newColor1 + ', ' + newColor2 + ')';

    return gradient;
  };

  return (
    <Link href={`/problems/${content}`}>
      <Wrapper color={initRandomGradient(content)}>
        <div>
          <Badge>문제 그룹</Badge>
          {name}
        </div>
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.div<{ color?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 240px;
  height: 240px;
  padding: 16px;
  border-radius: 4px;
  background: ${({ color, theme }) => color ?? theme.background.bg4};
  ${typo.Big1};
  font-size: 34px;
  line-height: 48px;
  color: ${({ theme }) => theme.text.f2};
  word-break: keep-all;
  overflow: hidden;
  transition: 0.2s ease;

  ${mediaQuery.medium} {
    width: 300px;
    height: 300px;
    padding: 24px;
    border-radius: 8px;
    font-size: 48px;
    line-height: 60px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 0;
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

  & > div {
    z-index: 1;
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

const Badge = styled.div`
  display: block;
  width: fit-content;
  padding: 3px 6px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: #8732c4;
  color: ${({ theme }) => theme.text.f2};
  ${typo.badge};
`;

type Props = {
  content: string;
  name: string;
};

export default GroupCard;
