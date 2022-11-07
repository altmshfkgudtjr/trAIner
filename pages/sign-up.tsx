import styled, { useTheme } from 'styled-components';
import { useState, useRef } from 'react';
import Router from 'next/router';
// components
import Symbol from 'components/atoms/Symbol';
import { FillButton } from 'tds/components/buttons';
import TextInput from 'components/atoms/inputs/Text';
import PasswordInput from 'components/atoms/inputs/Password';
import AgreementSection from 'components/presenters/auth/AgreementSection';
// api
import { useSignUpMutation } from 'api/user';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useSnackbar from 'hooks/dom/useSnackbar';
// styles
import { typo } from 'tds';

/** 회원가입 페이지 */
const SignUpPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const id = useRef<HTMLInputElement>(null);
  const pw = useRef<HTMLInputElement>(null);

  const { MetaTitle } = useMetaData();
  const currentTheme = useTheme();
  const { initSnackbar } = useSnackbar();

  const { mutate, status } = useSignUpMutation();

  const onSuccessHandler = () => {
    if (typeof Router.query.redirect === 'string') {
      window.location.href = Router.query.redirect;
    } else {
      window.location.href = '/';
    }
  };

  const onSignUp = async () => {
    if (status === 'loading') {
      return;
    }

    if (!id.current || !pw.current) {
      return;
    }

    if (id.current.value === '') {
      initSnackbar({ type: 'Warning', title: '학번 입력', message: '정상적인 값을 입력해주세요' });
      return id.current.focus();
    } else if (id.current.value.length < 8) {
      initSnackbar({
        type: 'Warning',
        title: '학번 입력',
        message: '정상적인 값을 입력해주세요',
      });
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
      },
      {
        onSuccess: () => onSuccessHandler(),
        onError: () => {
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
      onSignUp();
    }
  };

  return (
    <>
      <MetaTitle content="회원가입" />

      <Wrapper>
        <BrandWrapper>
          <Symbol type="Color" w={48} h={48} isBackground />
        </BrandWrapper>
        <Title>회원가입</Title>
        {!isChecked && <AgreementSection onRead={() => setIsChecked(true)} />}
        {isChecked && (
          <>
            <FormWrapper>
              <TextInput
                ref={id}
                placeholder="세종대학교 포털 학번"
                autoComplete="off"
                maxLength={20}
                autoFocus
                onKeyDown={onKeyDown}
              />
              <PasswordInput
                ref={pw}
                placeholder="세종대학교 포털 비밀번호"
                autoComplete="off"
                onKeyDown={onKeyDown}
              />
            </FormWrapper>
            <ButtonWrapper>
              <FillButton
                size="Regular"
                color={currentTheme.background.bg5}
                onClick={() => setIsChecked(false)}
              >
                돌아가기
              </FillButton>
              <FillButton
                size="Regular"
                color={currentTheme.primary}
                onClick={status === 'loading' ? undefined : onSignUp}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? '인증 중' : '계속하기'}
              </FillButton>
            </ButtonWrapper>
          </>
        )}
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

export default SignUpPage;
