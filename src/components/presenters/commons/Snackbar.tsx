import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
// styles
import { animations, boxShadow, typo } from 'tds';
// types
import { Snackbar as SnackbarInfo, SnackbarType } from 'store/system/snackbar';
import { SnackbarPosition } from 'providers/SnackbarProvider';

/**
 * 스낵바
 * @param props
 * @param props.idx 스낵바 순서
 * @param props.snackbar 스낵바 정보
 * @param props.position 위치
 * @param props.duration 지속 시간
 * @param props.animationDuration 애니메이션 진행 시간
 * @param props.closeEnabled 닫기 여부
 * @param props.stackEnabled 스택 여부
 * @param props.maxCount 최대 개수
 * @param props.onRemove 스낵바 닫기 함수
 */
const Snackbar = ({
  idx,
  snackbar,
  position,
  duration,
  animationDuration,
  closeEnabled,
  stackEnabled,
  maxCount,
  onRemove,
}: Props) => {
  const [isClose, setIsClose] = useState(false);

  const onClose = () => closeEnabled && setIsClose(true);

  /** 최대 개수에 따른 오래된 스낵바 제거 */
  useEffect(() => {
    if (idx === maxCount) {
      setIsClose(true);
    }

    if (!stackEnabled && idx === 1) {
      setIsClose(true);
    }
  }, [idx, maxCount, stackEnabled]);

  /** Timer 시작 */
  useEffect(() => {
    if (isClose) {
      return;
    }

    const _ = window.setTimeout(() => setIsClose(true), duration);
    return () => window.clearTimeout(_);
  }, [isClose, duration]);

  /** 닫는 애니메이션 시작 */
  useEffect(() => {
    if (!isClose) {
      return;
    }

    const _ = window.setTimeout(() => onRemove(snackbar.id), animationDuration);
    return () => window.clearTimeout(_);
  }, [isClose, snackbar, animationDuration, onRemove]);

  return (
    <PositionWrapper
      isTop={position.startsWith('Top')}
      idx={idx}
      stackEnabled={stackEnabled}
      onClick={onClose}
    >
      <AnimeWrapper
        idx={idx}
        isTop={position.startsWith('Top')}
        isClose={isClose}
        animationDuration={animationDuration}
      >
        <CursorActiveWrapper
          isClose={isClose}
          isTop={position.startsWith('Top')}
          idx={idx}
          stackEnabled={stackEnabled}
        >
          <Wrapper
            isClose={isClose}
            isTop={position.startsWith('Top')}
            idx={idx}
            snackbarType={snackbar.type}
            animationDuration={animationDuration}
            closeEnabled={closeEnabled}
            stackEnabled={stackEnabled}
          >
            {!!snackbar.title && <Title>{snackbar.title}</Title>}
            <Message>{snackbar.message}</Message>
          </Wrapper>
        </CursorActiveWrapper>
      </AnimeWrapper>
    </PositionWrapper>
  );
};

type PositionWrapperProps = {
  isTop: boolean;
  idx: number;
  stackEnabled: boolean;
};
const PositionWrapper = styled.div<PositionWrapperProps>`
  position: absolute;
  ${({ isTop }) =>
    isTop
      ? css`
          top: 0;
        `
      : css`
          bottom: 0;
        `};
  right: 0;
  width: 100%;
  height: auto;
  transform: ${({ idx, stackEnabled, isTop }) => {
    if (!stackEnabled) {
      return '';
    }

    return `translate(0, calc((100% + 8px) * ${idx} * ${isTop ? 1 : -1}))`;
  }};
  transition: transform 0.2s ease;
`;

type AnimeWrapperProps = {
  idx: number;
  isTop: boolean;
  isClose: boolean;
  animationDuration: number;
};
const AnimeWrapper = styled.div<AnimeWrapperProps>`
  ${({ isTop, isClose, animationDuration }) =>
    isClose
      ? css`
          animation: ${animationDuration}ms
            ${isTop ? animations.fadeOutBottom(`8px`) : animations.fadeOutTop('-8px')} ease;
        `
      : css`
          animation: ${animationDuration}ms
            ${isTop ? animations.moveInTop('-88px') : animations.moveInBottom('88px')} ease;
        `};
`;

type CursorActiveWrapperProps = {
  isClose: boolean;
  isTop: boolean;
  idx: number;
  stackEnabled: boolean;
};
const CursorActiveWrapper = styled.div<CursorActiveWrapperProps>`
  transform: ${({ isClose }) => (isClose ? 'scale(0.96, 0.96)' : 'scale(1, 1)')};
  transition: transform 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    opacity: ${({ isClose }) => (isClose ? 1 : 0)};
    pointer-events: none;
    transition: 0.2s ease;
  }

  &:active {
    transform: scale(0.96, 0.96);

    &::after {
      opacity: 1;
    }
  }
`;

type WrapperType = {
  isClose: boolean;
  isTop: boolean;
  idx: number;
  snackbarType: SnackbarType;
  animationDuration: number;
  closeEnabled: boolean;
  stackEnabled: boolean;
};
const Wrapper = styled.div<WrapperType>`
  width: 100%;
  height: auto;
  padding: 16px;
  border-radius: 8px;
  color: ${({ snackbarType, theme }) => {
    const _ = {
      Info: theme.semantic.info,
      Success: theme.semantic.success,
      Warning: theme.semantic.warning,
      Danger: theme.semantic.danger,
    };
    return _[snackbarType];
  }};
  background-color: ${({ snackbarType }) => {
    const _ = {
      Info: '#ECF4FD',
      Success: '#ECF8F4',
      Warning: '#FBF4EC',
      Danger: '#FBF0F1',
    };
    return _[snackbarType];
  }};
  ${boxShadow.e1};
  overflow: hidden;
  cursor: ${({ isClose, closeEnabled }) =>
    isClose ? 'default' : closeEnabled ? 'pointer' : 'initial'};
`;

const Title = styled.p`
  margin-bottom: 8px;
  ${typo.subtitle1};
  color: inherit;
`;

const Message = styled.p`
  ${typo.subvalue2};
  color: inherit;
`;

type Props = {
  idx: number;
  snackbar: SnackbarInfo;
  position: SnackbarPosition;
  duration: number;
  animationDuration: number;
  closeEnabled: boolean;
  stackEnabled: boolean;
  maxCount: number;
  onRemove: (snackbarId: string) => void;
};

export default Snackbar;
