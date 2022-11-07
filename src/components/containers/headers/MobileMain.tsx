import styled, { useTheme } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useRef } from 'react';
import Link from 'next/link';
// components
import Logo from 'components/atoms/Logo';
import { TextButton } from 'tds/components/buttons';
// store
import themeState from 'store/system/theme';
// hooks
import useScrollHeader from 'hooks/dom/useScrollHeader';
// styles
import { mediaQuery, zIndex } from 'tds';
import { boxShadow } from 'tds';
// types
import type { User } from 'types/api/user';

/** 모바일 메인 헤더 */
const MobileMainHeader = ({ profile }: Props) => {
  const currentTheme = useTheme();
  const theme = useRecoilValue(themeState);
  const headerRef = useRef(null);

  useScrollHeader(headerRef);

  return (
    <>
      <Wrapper>
        <Header ref={headerRef}>
          <Logo height={24} />

          <div>
            {profile && (
              <Link href="/profile">
                <TextButton
                  size="ExtraSmall"
                  color={
                    theme.mode === 'Light' ? currentTheme.semantic.white : currentTheme.primary
                  }
                >
                  {profile.name}님
                </TextButton>
              </Link>
            )}

            {!profile && (
              <>
                <Link href="/sign-in">
                  <TextButton
                    size="ExtraSmall"
                    color={
                      theme.mode === 'Light' ? currentTheme.semantic.white : currentTheme.primary
                    }
                  >
                    로그인
                  </TextButton>
                </Link>
                <Link href="/sign-up">
                  <TextButton
                    size="ExtraSmall"
                    color={
                      theme.mode === 'Light' ? currentTheme.semantic.white : currentTheme.primary
                    }
                  >
                    가입하기
                  </TextButton>
                </Link>
              </>
            )}
          </div>
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
  ${boxShadow.e3};

  & > div {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  ${mediaQuery.large} {
    padding: 8px 12px;
  }
`;

const HeaderSpace = styled.div`
  height: 48px;
`;

type Props = {
  profile?: User;
};

export default MobileMainHeader;
