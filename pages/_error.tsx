import styled from 'styled-components';
import { useRouter } from 'next/router';
// components
import { OutlineButton } from 'sjds/components/buttons';
// styles
import { typo, mediaQuery } from 'sjds';

const ErrorPage = ({ statusCode }) => {
  const router = useRouter();

  const onBack = () => router.back();

  return (
    <Wrapper>
      <MessageBox>
        {statusCode && (
          <>
            <h1>{statusCode}</h1>
            <p>요청하신 페이지를 찾을 수 없습니다.</p>
            <p>입력하신 주소가 정확한지 다시 한번 확인해 주세요.</p>
          </>
        )}
        {!statusCode && (
          <>
            <p>일시적인 오류가 발생하였습니다.</p>
            <p>잠시 후, 다시 접속해주세요.</p>
          </>
        )}
      </MessageBox>
      <ButtonWrapper>
        {statusCode && (
          <>
            <Button size="Large" onClick={onBack}>
              되돌아가기
            </Button>
            <Button forwardedAs="a" href="/" size="Large">
              홈으로
            </Button>
          </>
        )}
        {!statusCode && (
          <>
            <Button forwardedAs="a" href="" size="Large" onClick={onBack}>
              새로고침
            </Button>
            <Button forwardedAs="a" href="/" size="Large">
              홈으로
            </Button>
          </>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
};

export async function getServerSideProps({ res, err }) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {
    props: {
      statusCode,
    },
  };
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const MessageBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    ${typo.headline1};
    color: ${({ theme }) => theme.primary_600};
  }

  p {
    ${typo.subtitle1};
  }
`;

const ButtonWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-direction: column;
  margin-top: 20px;

  ${mediaQuery.medium} {
    flex-direction: row;
  }
`;

const Button = styled(OutlineButton)``;

export default ErrorPage;
