import styled from 'styled-components';
// components
import { FillButton } from 'tds/components/buttons';
// styles
import { typo, boxShadow } from 'tds';

const SubmitResultModal = ({ onCloseModal, args }) => {
  const { result, executionTime }: Args = args;

  return (
    <Wrapper>
      <div>
        {result && <Title result={result}>정답입니다.</Title>}
        {!result && <Title result={result}>오답입니다.</Title>}

        <ExecutionTime result={result}>
          <span>실행시간:</span> {executionTime}ms
        </ExecutionTime>
      </div>
      <Button onClick={onCloseModal} size="Regular">
        닫기
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: 240px;
  background-color: #fff;
  padding: 24px;
  border-radius: 24px;
  ${boxShadow.e3}
`;

const Title = styled.h1<{ result: boolean }>`
  ${typo.headline1};
  color: ${({ result, theme }) => (result ? theme.semantic.success : theme.semantic.danger)};
`;

const ExecutionTime = styled.p<{ result: boolean }>`
  ${typo.subtitle3};
  color: ${({ result, theme }) => (result ? theme.semantic.success : theme.semantic.danger)};

  span {
    margin-right: 4px;
    color: ${({ theme }) => theme.text.f4};
  }
`;

const Button = styled(FillButton)`
  flex: 0 0 auto;
  background-color: ${({ theme }) => theme.semantic.info};
  color: #fff;
`;

type Args = {
  result: boolean;
  executionTime: number;
};

export default SubmitResultModal;
