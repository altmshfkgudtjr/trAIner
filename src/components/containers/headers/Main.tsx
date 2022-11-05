import styled, { css, useTheme } from 'styled-components';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
// components
import { TextButton } from 'tds/components/buttons';
import Logo from 'components/atoms/Logo';
// store
import themeState from 'store/system/theme';
// styles
import { mediaQuery, zIndex, typo } from 'tds';
import { lib, animations } from 'tds';

const MainHeader = () => {
  const currentTheme = useTheme();
  // const { status, data } = useUserController.GetProfile();
  const theme = useRecoilValue(themeState);

  return (
    <Wrapper>
      <ContentWrapper>
        <Logo type={theme.mode === 'Dark' ? 'White' : 'Black'} height={24} />

        <div>
          <Link href="/sign-in">
            <TextButton
              size="ExtraSmall"
              color={theme.mode === 'Light' ? currentTheme.semantic.white : currentTheme.primary}
            >
              로그인
            </TextButton>
          </Link>
          <Link href="/sign-up">
            <TextButton
              size="ExtraSmall"
              color={theme.mode === 'Light' ? currentTheme.semantic.white : currentTheme.primary}
            >
              가입하기
            </TextButton>
          </Link>
        </div>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  position: relative;
  top: 12px;
  left: 0;
  right: 0;
  width: 400px;
  max-width: 100%;
  height: 36px;
  margin: auto;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.text.f2};
  overflow: hidden;
  z-index: ${zIndex.header};

  animation: 0.6s ${animations.zoomIn(0)} ease-in-out;

  ${mediaQuery.medium} {
    position: fixed;
    height: 48px;
    border-radius: 24px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 100%;
  padding: 4px 24px;
  ${typo.body2}

  & > div {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  ${mediaQuery.medium} {
    padding: 10px 24px;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.text.f3};
  color: ${({ theme }) => theme.semantic.black};
  transition: 0.1s ease;

  ${lib.onlyHover(css`
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text.f2};
  `)};
`;

export default MainHeader;