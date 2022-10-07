import styled, { useTheme } from 'styled-components';
import Link from 'next/link';
import { useEffect } from 'react';
// components
import Layout from 'components/layouts';
import { FillButton, TextButton } from 'sjds/components/buttons';
import { MainLayout } from 'sjds/layouts';
// hooks
import useSnackbar from 'hooks/dom/useSnackbar';
// style
import { mediaQuery, typo } from 'sjds';

/** 홈 페이지 */
const HomePage = () => {
  const currentTheme = useTheme();

  // const { status, data } = useUserController.GetProfile();
  const { status, data } = { status: 'error', data: { name: '홍길동' } };

  const { initSnackbar } = useSnackbar();

  useEffect(() => {
    initSnackbar({
      type: 'Info',
      title: '반갑습니다',
      message: '2022년 데이터베이스 수업은 저희와 함께하세요!',
    });
  }, [initSnackbar]);

  return (
    <>
      <Wrapper>
        <section>
          <Title>
            세종대학교
            <br />
            <strong>trAIner</strong>와 만나다
          </Title>
          <Link href={status === 'success' && !!data ? '/dashboard' : '/sign-in'} passHref>
            <FillButton
              forwardedAs="a"
              color={currentTheme.primary}
              size="Regular"
              style={{ width: '180px' }}
            >
              대시보드로 이동하기
            </FillButton>
          </Link>
          {status !== 'idle' && status !== 'loading' && !data && (
            <LoginBox>
              이미 회원가입 하셨나요?
              <Link href="/sign-in" passHref>
                <SignInButton forwardedAs="a" size="Regular">
                  로그인
                </SignInButton>
              </Link>
            </LoginBox>
          )}
        </section>
      </Wrapper>
    </>
  );
};

HomePage.getLayout = page => {
  return <Layout>{page}</Layout>;
};

const Wrapper = styled(MainLayout)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  gap: 60px;
  width: 100%;
  max-width: 1240px;
  padding: 0 20px;
  margin: 80px auto 0;

  & > div {
    flex: 1 0 auto;
    width: 100%;
  }

  ${mediaQuery.large} {
    flex-direction: row;
    gap: 0px;
    margin: 160px auto 0;

    & > div {
      width: 50%;
    }
  }
`;

const Title = styled.h1`
  ${typo.headline1};
  font-size: 64px;
  line-height: calc(100% + 24px);
  margin-bottom: 40px;
  color: ${({ theme }) => theme.text.f3};

  & > strong {
    color: ${({ theme }) => theme.primary};
  }
`;

const LoginBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 30px;
  color: ${({ theme }) => theme.text.f2};

  & > a {
    flex: 0 0 auto;
  }
`;
const SignInButton = styled(TextButton)`
  flex-grow: 0;
  width: 80px;
  color: ${({ theme }) => theme.text.f1};
`;

export default HomePage;
