import styled, { css } from 'styled-components';
import Split from 'react-split';
// components
import Loading from 'components/atoms/Loading';
// hooks
import useMatchMedia from 'hooks/dom/useMatchMedia';
// styles
import { boxShadow, lib } from 'tds';
// types
import type { ReactNode } from 'react';

/**
 * 대시보드 조절이 가능한 3등분 영역
 * - 문제풀이 View
 */
const ResizableArea = ({ left, right }: Props) => {
  const { isMatch: isDesktop, status: mediaStatus } = useMatchMedia({ media: 'medium' });

  if (mediaStatus !== 'done') {
    return <Loading />;
  }

  return (
    <>
      {!isDesktop && <Area id="shell-left">{left}</Area>}
      {isDesktop && (
        <SplitLayout
          direction="horizontal"
          sizes={[40, 60]}
          minSize={300}
          gutterSize={12}
          style={{ height: '100%' }}
        >
          <Area id="shell-left">{left}</Area>
          <Area id="shell-right">{right}</Area>
        </SplitLayout>
      )}
    </>
  );
};

const SplitLayout = styled(Split)<{ direction: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${({ direction }) => (direction === 'vertical' ? 'column' : 'row')};
  position: relative;

  .gutter {
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.background.bg4};
    transition: background-color 0.2s ease;

    ${lib.onlyHover(css`
      background-color: ${({ theme }) => theme.background.bg5};
    `)};
  }

  .gutter-horizontal {
    width: 12px;
    height: 100%;
    cursor: col-resize;
  }

  .gutter-vertical {
    width: 100%;
    height: 12px;
    cursor: row-resize;
  }
`;

const Area = styled.div<{ isDeep?: boolean }>`
  padding: 20px 20px 0 20px;
  background-color: ${({ isDeep, theme }) =>
    isDeep ? theme.background.bg3 : theme.background.bg2};
  box-sizing: border-box;
  overflow-y: auto;

  &#shell-right {
    padding: 0;
  }

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.background.bg4};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: ${({ theme }) => theme.background.bg5};
    opacity: 0.8;
    ${boxShadow.e1};

    ${lib.onlyHover(css`
      opacity: 1;
    `)}
  }
`;

type Props = {
  left: ReactNode;
  right: ReactNode;
};

export default ResizableArea;
