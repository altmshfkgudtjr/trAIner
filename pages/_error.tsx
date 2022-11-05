import styled from 'styled-components';
// styles
import { typo } from 'tds';

const ErrorPage = ({ statusCode }) => {
  return (
    <Wrapper>
      <MessageBox>
        {statusCode && (
          <>
            <h1>{statusCode}</h1>
            <br />
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
    color: ${({ theme }) => theme.primary};
  }

  p {
    ${typo.subtitle1};
    color: ${({ theme }) => theme.text.f1};
  }
`;

export default ErrorPage;
