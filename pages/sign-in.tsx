import styled, { useTheme } from 'styled-components';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
// components
import Symbol from 'components/atoms/Symbol';
import TextInput from 'components/atoms/inputs/Text';
import PasswordInput from 'components/atoms/inputs/Password';
import CheckBox from 'components/atoms/inputs/Checkbox';
import { FillButton } from 'tds/components/buttons';
// api
import { useSignInMutation } from 'api/user';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useSnackbar from 'hooks/dom/useSnackbar';
// styles
import { typo } from 'tds';

/** 로그인 페이지 */
const SignInPage = () => {
  const [isChecked, setIsChecked] = useState(true);

  const id = useRef<HTMLInputElement>(null);
  const pw = useRef<HTMLInputElement>(null);

  const { MetaTitle } = useMetaData();
  const currentTheme = useTheme();
  const router = useRouter();
  const { initSnackbar } = useSnackbar();

  const { mutate, status } = useSignInMutation();

  const onSuccessHandler = () => {
    if (typeof Router.query.redirect === 'string') {
      window.location.href = Router.query.redirect;
    } else {
      window.location.href = '/';
    }
  };

  const onChangeCheckBox = () => setIsChecked(v => !v);

  const onBack = () => router.back();

  const onSignIn = () => {
    if (status === 'loading') {
      return;
    }

    if (!id.current || !pw.current) {
      return;
    }

    if (id.current.value === '') {
      initSnackbar({ type: 'Warning', title: '아이디 입력', message: '올바른 값을 입력해주세요' });
      return id.current.focus();
    }

    if (pw.current.value === '') {
      initSnackbar({
        type: 'Warning',
        title: '비밀번호 입력',
        message: '올바른 값을 입력해주세요',
      });
      return pw.current.focus();
    }

    mutate(
      {
        id: id.current.value,
        pw: pw.current.value,
        isPersist: isChecked,
      },
      {
        onSuccess: () => onSuccessHandler(),
        onError: (err: any) => {
          if (err.response.status === 403) {
            return initSnackbar({
              type: 'Danger',
              title: '로그인 실패',
              message: '아이디 또는 비밀번호를 확인 후, 다시 로그인해주세요',
            });
          }

          initSnackbar({
            type: 'Danger',
            title: '서버와의 연결 오류',
            message: '잠시 후 다시 시도해주세요',
          });
        },
      },
    );
  };

  const onKeyDown = e => {
    if (e.code === 'Enter') {
      onSignIn();
    }
  };

  return (
    <>
      <MetaTitle content="로그인" />

      <Wrapper>
        <BrandWrapper>
          <Symbol type="Color" w={48} h={48} isBackground />
        </BrandWrapper>
        <Title>로그인</Title>
        <FormWrapper>
          <TextInput
            ref={id}
            placeholder="세종대학교 포털 학번"
            autoComplete="off"
            autoFocus
            onKeyDown={onKeyDown}
          />
          <PasswordInput
            ref={pw}
            placeholder="세종대학교 포털 비밀번호"
            autoComplete="off"
            onKeyDown={onKeyDown}
          />
          <CheckBox
            label="password-persist"
            message="로그인 상태 유지"
            checked={isChecked}
            onChange={onChangeCheckBox}
          />
        </FormWrapper>
        <ButtonWrapper>
          <FillButton color={currentTheme.background.bg5} onClick={onBack}>
            돌아가기
          </FillButton>
          <FillButton
            color={currentTheme.primary}
            onClick={status === 'loading' ? undefined : onSignIn}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? '진입 중' : '로그인'}
          </FillButton>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 60px - 100px);
`;

const BrandWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  ${typo.headline1};
  margin: 40px auto 50px;
  color: ${({ theme }) => theme.text.f2};
`;

const FormWrapper = styled.div`
  margin-bottom: 40px;

  & > div {
    width: 320px;
  }

  & > div:not(:first-of-type) {
    margin-top: 24px;
  }

  & > div:last-of-type {
    margin-bottom: 16px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 320px;

  & > button {
    flex: 1;
  }
`;

export default SignInPage;
