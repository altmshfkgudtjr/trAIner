import styled from 'styled-components';
// styles
import { typo } from 'tds';

/**
 * 문제 타입 뱃지
 */
const ProblemBadge = styled.span<{ type?: BadgeType }>`
  display: inline-block;
  padding: 3px 6px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: ${({ type, theme }) =>
    !type
      ? theme.background.bg1
      : type === 'Easy'
      ? theme.primary
      : type === 'Normal'
      ? '#d8a20d'
      : '#dd1c1c'};
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
