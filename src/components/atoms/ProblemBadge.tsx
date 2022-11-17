import styled from 'styled-components';
// styles
import { typo } from 'tds';

/**
 * 문제 타입 뱃지
 */
const ProblemBadge = styled.span<{ type?: BadgeType }>`
  display: block;
  width: fit-content;
  padding: 3px 6px;
  border-radius: 4px;
  background-color: ${({ type, theme }) =>
    !type
      ? theme.background.bg1
      : type === 'Easy'
      ? theme.themeType === 'dark'
        ? '#3c54ee'
        : '#adb6ff'
      : type === 'Normal'
      ? theme.themeType === 'dark'
        ? '#d8a20d'
        : '#ffe23e'
      : theme.themeType === 'dark'
      ? '#dd1c1c'
      : '#ff9797'};
  color: ${({ theme }) => theme.text.f2};
  ${typo.badge};
`;

/**
 * 문제 타입 뱃지
 * - 문제 정답률에 따른 구분
 *   - Easy: 1 ~ 6
 *   - Normal: 6 ~ 11
 *   - Hard: 11 ~ 15
 */
type BadgeType = 'Easy' | 'Normal' | 'Hard';

export default ProblemBadge;
