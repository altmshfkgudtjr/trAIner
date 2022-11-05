import styled, { css } from 'styled-components';
import { useRef } from 'react';
import Link from 'next/link';
// import { useRecoilState } from 'recoil';
// components
import Logo from 'components/atoms/Logo';
// hooks
import useScrollHeader from 'hooks/dom/useScrollHeader';
// styles
import { mediaQuery, zIndex } from 'tds';
import { lib } from 'tds';

/** 모바일 메인 헤더 */
const MobileMainHeader = () => {
  const headerRef = useRef(null);
  useScrollHeader(headerRef);

  // const [state, setState] = useRecoilState(uiState);

  return (
    <>
      <Wrapper>
        <Header ref={headerRef}>
          <Logo height={24} />

          <Link href="/sign-in">
            <Button>로그인</Button>
          </Link>
        </Header>
      </Wrapper>

      <HeaderSpace />
    </>
  );
};

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${zIndex.header};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 8px 12px;
  border-radius: 0 0 16px 16px;
  background-color: ${({ theme }) => theme.text.f2};

  ${mediaQuery.large} {
    padding: 8px 12px;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  color: ${({ theme }) => theme.semantic.black};
  transition: 0.1s ease;

  ${lib.onlyHover(css`
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text.f2};
  `)};
`;

const HeaderSpace = styled.div`
  height: 48px;
`;

export default MobileMainHeader;
