import styled from 'styled-components';
// components
import { MainLayout } from 'ruix/layouts';
// styles
import { mediaQuery } from 'ruix';

/**
 * 한국 마켓리스트 최소 영역
 * - Desktop Row Height: 80px
 * - Mobile Row Height: 72px;
 *
 * @param props
 * @param props.rowCount 테이블 Row 개수
 * @param porps.isLoaded 테이블 로딩 여부
 */
const MarketListKR = styled(MainLayout)<{ rowCount?: number; isLoading?: boolean }>`
  min-height: ${({ rowCount, isLoading }) => isLoading && `${(rowCount ?? 0) * 72}px`};

  ${mediaQuery.medium} {
    min-height: ${({ rowCount, isLoading }) => isLoading && `${(rowCount ?? 0) * 80}px`};
  }
`;

export default MarketListKR;
