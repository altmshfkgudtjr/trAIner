import styled from 'styled-components';
import { useRef } from 'react';
// components
import Badge from 'components/presenters/problem/shell/Badge';
// styles
import { typo } from 'tds';
// types
import type { Problem } from 'types/api/problem';
import type { InputHTMLAttributes } from 'react';

/**
 * 쉘 - 문제 설명
 */
const ProblemContent = ({ problem }: Props) => {
  const target = useRef<HTMLTextAreaElement>(null);

  const onFocus = () => {
    if (!target.current) {
      return;
    }

    target.current.focus();
  };

  return (
    <Wrapper onClick={onFocus}>
      <ContentWrapper>
        <Content dangerouslySetInnerHTML={{ __html: problem?.description ?? '' }} />
      </ContentWrapper>

      {problem?.limit && (
        <ContentWrapper>
          <Badge text="문제 조건" />
          <Content dangerouslySetInnerHTML={{ __html: problem?.limit ?? '' }} />
        </ContentWrapper>
      )}

      <ContentWrapper>
        {problem?.input && (
          <>
            <Badge text="입력값" />
            <Content dangerouslySetInnerHTML={{ __html: problem.input ?? '' }} />
          </>
        )}
        {problem?.output && (
          <>
            <Badge text="출력값" />
            <Content dangerouslySetInnerHTML={{ __html: problem.output ?? '' }} />
          </>
        )}
      </ContentWrapper>

      {problem?.example?.map((v, idx) => (
        <ExampleWrapper key={idx}>
          <ExampleNumber>예제 {idx + 1}</ExampleNumber>
          {v.sample_explain && (
            <>
              <ExampleBadge>설명</ExampleBadge>
              <Content dangerouslySetInnerHTML={{ __html: v.sample_explain ?? '' }} />
            </>
          )}
          {v.sample_input && (
            <>
              <ExampleBadge>입력값</ExampleBadge>
              <Content dangerouslySetInnerHTML={{ __html: v.sample_input ?? '' }} />
            </>
          )}
          {v.sample_output && (
            <>
              <ExampleBadge>출력값</ExampleBadge>
              <Content dangerouslySetInnerHTML={{ __html: v.sample_output ?? '' }} />
            </>
          )}
        </ExampleWrapper>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  flex: 1;
  width: 100%;
  cursor: text;
`;

const ContentWrapper = styled.div`
  position: relative;
  margin-bottom: 32px;
`;

const ExampleBadge = styled.div``;
const ExampleNumber = styled.p``;
const ExampleWrapper = styled(ContentWrapper)`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.border.b2};
  border-radius: 8px;

  ${ExampleNumber} {
    position: relative;
    width: fit-content;
    padding: 0 8px;
    ${typo.badge};
    color: ${({ theme }) => theme.text.f2};
    background-color: ${({ theme }) => theme.background.bg2};
    transform: translateY(-20px);
  }

  ${ExampleBadge} {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 8px;
    ${typo.value3};
    color: ${({ theme }) => theme.primary};
  }
`;

const Content = styled.div`
  margin-bottom: 16px;
  white-space: pre-wrap;
  ${typo.body2};
  color: ${({ theme }) => theme.text.f1};

  div,
  p {
    white-space: pre-line;
  }
`;

type Props = {
  problem?: Problem;
} & InputHTMLAttributes<HTMLTextAreaElement>;

export default ProblemContent;
