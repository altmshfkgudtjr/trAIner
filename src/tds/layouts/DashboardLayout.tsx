import styled from 'styled-components';
// styles
import { mediaQuery } from 'tds';

/**
 * 대시보드 레이아웃
 */
const DashboardLayout = styled.div`
  padding: 0 0 40px;
  margin: 0 auto;

  ${mediaQuery.medium} {
    padding: 0 0 160px;
  }

  ${mediaQuery.large} {
    padding: 0 0 240px;
  }
`;

export default DashboardLayout;
