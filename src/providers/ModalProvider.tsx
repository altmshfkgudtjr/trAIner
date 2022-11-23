import styled, { css } from 'styled-components';
import { Suspense, useState, useEffect } from 'react';
import { useRecoilValue } from 'store';
// components
import * as modals from 'components/containers/commons/modals';
// hooks
import useModal from 'hooks/dom/useModal';
// styles
import { zIndex, animations } from 'tds';
// types
import type { ModalOptions } from 'store/system/modal';

/**
 * 모달 컨트롤러
 */
const ModalProvider = () => {
  const [closingIdx, setClosingIdx] = useState<null | number>(null);

  const modalList = useRecoilValue(state => state.modalSystem.default);
  const { popModal, removeModal } = useModal();

  const defaultModalOptions: ModalOptions = {
    position: 'center',
    isEnableCloseByBackground: true,
  };
  const modalOptions: ModalOptions =
    modalList[modalList.length - 1]?.options ?? defaultModalOptions;

  const isExist = modalList.length > 0;

  /** Prevent MouseDown Close */
  const onPreventModalOff = e => e.stopPropagation();

  /** Modal Close */
  const onClose = name => {
    const idx = modalList.findIndex(modal => modal.name === name);
    setClosingIdx(idx);

    window.setTimeout(() => {
      setClosingIdx(null);
      removeModal(name);
    }, 200);
  };

  /** All Modal Close */
  const onCloseAll = () => {
    if (!modalOptions.isEnableCloseByBackground) {
      return;
    }

    setClosingIdx(modalList.length - 1);

    window.setTimeout(() => {
      popModal();
      setClosingIdx(null);
    }, 200);
  };

  useEffect(() => {
    if (isExist) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.removeAttribute('style');
    }

    return () => {
      document.body.removeAttribute('style');
    };
  }, [isExist]);

  const ModalList = modalList.map((modal, idx) => {
    const Content = modals[modal.name];
    return (
      <ModalWrapper
        key={modal.name}
        isClose={closingIdx === idx}
        options={modalOptions}
        onClick={onPreventModalOff}
      >
        <Suspense fallback={null}>
          <Content onCloseModal={() => onClose(modal.name)} args={modal.args} />
        </Suspense>
      </ModalWrapper>
    );
  });

  return <>{isExist && <Background onClick={onCloseAll}>{ModalList}</Background>}</>;
};

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: ${zIndex.modal};
  background-color: ${({ theme }) =>
    theme.themeType === 'light' ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.2)'};
  animation: 0.1s ${animations.fadeIn} ease;
`;

const ModalWrapper = styled.dialog<{ isClose: boolean; options: ModalOptions }>`
  position: absolute;
  width: fit-content;
  height: fit-content;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: ${({ options }) => {
    switch (options.position) {
      case 'center':
        return 'auto';
      case 'left':
        return 'auto auto auto 0';
      case 'right':
        return 'auto 0 auto auto';
      default:
        return 'auto';
    }
  }};
  border-radius: 24px;
  ${({ isClose, options }) => {
    if (isClose) {
      if (options.position === 'center') {
        return css`
          animation: 0.25s ${animations.fadeOutBottom()} ease;
        `;
      } else if (options.position === 'left') {
        return css`
          animation: 0.25s ${animations.fadeOutLeft()} ease;
        `;
      } else if (options.position === 'right') {
        return css`
          animation: 0.25s ${animations.fadeOutRight()} ease;
        `;
      }
    }

    if (!isClose) {
      if (options.position === 'center') {
        return css`
          animation: 0.25s ${animations.fadeInBottom()} ease;
        `;
      } else if (options.position === 'left') {
        return css`
          animation: 0.25s ${animations.fadeInLeft()} ease;
        `;
      } else if (options.position === 'right') {
        return css`
          animation: 0.25s ${animations.fadeInRight()} ease;
        `;
      }
    }
  }};
`;

export default ModalProvider;
