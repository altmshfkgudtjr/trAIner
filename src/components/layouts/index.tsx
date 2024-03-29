import styled from 'styled-components';
import { useRecoilValue } from 'store';
// components
import HeaderLayout from 'components/containers/headers';
import MainHeader from 'components/containers/headers/Main';
import MobileMainHeader from 'components/containers/headers/MobileMain';
// styles
import { mediaQuery } from 'tds';
// types
import type { ReactNode, PropsWithChildren } from 'react';
import type { User } from 'types/api/user';

/**
 * 메인 레이아웃
 * @param props
 * @param props.desktopHeader 데스크탑 헤더
 * @param props.mobileHeader 모바일 헤더
 */
const Layout = ({ desktopHeader, mobileHeader, children }: PropsWithChildren<Props>) => {
  const user = useRecoilValue(state => state.user.default);

  return (
    <>
      <HeaderLayout
        desktop={desktopHeader ?? <MainHeader profile={user ?? undefined} />}
        mobile={mobileHeader ?? <MobileMainHeader profile={user ?? undefined} />}
      />
      <Wrapper>
        <Body>{children}</Body>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: block;
  align-items: flex-start;
  justify-content: space-between;
  overflow: auto;
`;

const Body = styled.div`
  width: 100%;
  margin-left: auto;

  ${mediaQuery.large} {
    width: 100%;
  }
`;

type Props = {
  desktopHeader?: ReactNode;
  mobileHeader?: ReactNode;
  profile?: User;
};

export default Layout;
