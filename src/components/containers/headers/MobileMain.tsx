import styled from 'styled-components';
import { useRef } from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
// components
import Logo from 'components/atoms/Logo';
import { TextButton } from 'tds/components/buttons';
import { Icon } from 'tds/components/icons';
// store
import uiState from 'store/system/ui';
// hooks
import useScrollHeader from 'hooks/dom/useScrollHeader';
// styles
import { margin, mediaQuery, zIndex } from 'tds';

/** 모바일 메인 헤더 */
const MobileMainHeader = () => {
  // const { status, data } = useUserController.GetProfile();
  const { status, data } = { status: 'success', data: { name: '홍길동' } };

  const headerRef = useRef(null);
  useScrollHeader(headerRef);

  const [state, setState] = useRecoilState(uiState);

  return (
    <>
      <Wrapper>
        <Header ref={headerRef}>
          <LeftSide>
            <TextButton
              size="ExtraSmall"
              onClick={() => setState({ side: state.side === 'Open' ? 'Close' : 'Open' })}
            >
              <Icon name="ic_category" width={24} height={24} />
            </TextButton>
            <Logo w={112} h={18} />
          </LeftSide>

          <RightSide>
            {status === 'success' && !!data && (
              <Link href="/user/me" passHref>
                <TextButton as="a" size="ExtraSmall">
                  {data.result?.name} 님
                </TextButton>
              </Link>
            )}
            {status !== 'idle' && status !== 'loading' && !data && (
              <Link href="/sign-in" passHref>
                <TextButton as="a" size="ExtraSmall">
                  로그인
                </TextButton>
              </Link>
            )}
          </RightSide>
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
  padding: 8px 4px;
  background-color: ${({ theme }) => theme.background.bg1};

  ${mediaQuery.large} {
    padding: 8px 12px;
  }
`;

const LeftSide = styled.div`
  display: flex;

  & button {
    padding: 4px;
    margin-right: 8px;
  }

  & > a:not(:first-of-type) {
    ${margin.horizontal};
  }
`;

const RightSide = styled.div`
  display: flex;

  & > a {
    ${margin.horizontal};
  }
`;

const HeaderSpace = styled.div`
  height: 48px;
`;

export default MobileMainHeader;
