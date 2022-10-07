import type { ReactNode, PropsWithChildren } from 'react';
import styled from 'styled-components';
// components
import HeaderLayout from 'components/containers/commons/headers';
import MainHeader from 'components/containers/commons/headers/Main';
import MobileMainHeader from 'components/containers/commons/headers/MobileMain';
import Footer from 'components/presenters/Footer';

/**
 * 메인 레이아웃
 * @param props
 * @param props.isFooter 푸터 여부
 * @param props.desktopHeader 데스크탑 헤더
 * @param props.mobileHeader 모바일 헤더
 */
const Layout = ({
  isFooter = true,
  desktopHeader = <MainHeader />,
  mobileHeader = <MobileMainHeader />,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <>
      <HeaderLayout desktop={desktopHeader} mobile={mobileHeader} />
      <Body>{children}</Body>
      {isFooter && <Footer />}
    </>
  );
};

const Body = styled.div`
  min-height: calc(100vh - 56px - 80px);
`;

type Props = {
  isFooter?: boolean;
  desktopHeader?: ReactNode;
  mobileHeader?: ReactNode;
};

export default Layout;
