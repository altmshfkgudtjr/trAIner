import styled, { css } from 'styled-components';
import { forwardRef } from 'react';
// types
import type { ReactNode } from 'react';

/**
 * 비율이 존재하는 슬라이더
 * - 화면 크기에 따라서 컴포넌트를 다른 비율로 보여준다.
 * @param props
 * @param props.verticalPadding 상하 여백 값(px)
 * @param props.horizontalPadding 좌측 여백 값(px)
 * @param props.ItemList 컴포넌트 리스트
 */
const RatioSlider = ({ verticalPadding = 16, horizontalPadding = 16, ItemList }: Props, ref) => (
  <Wrapper verticalPadding={verticalPadding} horizontalPadding={horizontalPadding} ref={ref}>
    {ItemList}
  </Wrapper>
);

const Wrapper = styled.ul<{ verticalPadding: number; horizontalPadding: number }>`
  display: flex;
  flex-wrap: nowrap;
  gap: 32px;
  padding: ${({ verticalPadding, horizontalPadding }) =>
    `${verticalPadding}px ${horizontalPadding}px`};
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;
  overscroll-behavior: none auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const createCSS = (obj: ViewRatio[]) => {
  let styles = '';

  for (let i = 0, len = obj.length; i < len; i++) {
    if (obj[i].break === 'default') {
      styles += `mmin-width: calc(100% / ${obj[i].ratio} - ${
        (16 * 2 * (obj[i].ratio - 1)) / obj[i].ratio
      }px);min-width: calc(100% / ${obj[i].ratio} - ${
        (16 * 2 * (obj[i].ratio - 1)) / obj[i].ratio
      }px);`;
    } else {
      styles += `
				@media (min-width: ${obj[i].break}px) {
					min-width: calc(100% / ${obj[i].ratio} - ${(16 * 2 * (obj[i].ratio - 1)) / obj[i].ratio}px);
				}
			`;
    }
  }

  return css`
    ${styles}
  `;
};

/**
 * 슬라이더에 들어가는 각 슬라이드
 * @param props
 * @param props.viewRatio
 */
export const RatioSlide = styled.li<{ viewRatio: ViewRatio[] }>`
  flex: 1;
  display: inline-block;
  width: 100%;
  vertical-align: top;

  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 32px;
  }

  ${({ viewRatio }) => createCSS(viewRatio)};
`;

export type ViewRatio = {
  break: 'default' | number;
  ratio: number;
};

type Props = {
  verticalPadding?: number;
  horizontalPadding?: number;
  ItemList: ReactNode;
};

export default forwardRef(RatioSlider);
