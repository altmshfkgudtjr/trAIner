import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
// components
import { TextButton } from 'tds/components/buttons';
import ResizableArea from 'components/containers/problem/ResizableArea';
import 문제영역 from 'components/containers/problem/shell/문제영역';
import 풀이영역 from 'components/containers/problem/shell/풀이영역';
// api
import { useProblemQuery } from 'api/problem';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
// styles
import { lib, typo } from 'tds';

/** 문제 페이지 */
const ProlbemPage = () => {
  const { query, back } = useRouter();
  const problemId = query.problemId as string;

  const inputValue = useRef('');

  const { MetaTitle } = useMetaData();
  const { data: problemData } = useProblemQuery({ problemId });

  const onChangeValue = value => {
    inputValue.current = value;
  };

  useEffect(() => {
    if (problemData?.result) {
      // TODO 작성
      // onChangeValue(problemData.result.latest_query);
    }
  }, [problemData]);

  return (
    <>
      <MetaTitle content="문제" />

      <Wrapper>
        <TopWrapper>
          <BackButton onClick={() => back()} size="ExtraSmall">
            나가기
          </BackButton>
          {problemData?.result && (
            <Title>
              {problemData.result?.titleKo} <span>({problemData.result.problemId})</span>
            </Title>
          )}
        </TopWrapper>

        <ShellWrapper>
          <ResizableArea
            left={<문제영역 problemId={problemId} />}
            right={<풀이영역 problemId={problemId} initCode={''} onChangeValue={onChangeValue} />}
          />
        </ShellWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const Title = styled.h1``;
const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  height: 48px;
  padding: 8px 8px;

  ${Title} {
    ${typo.subtitle3};
    color: ${({ theme }) => theme.text.f2};
    ${lib.textLineClamp(1)}

    span {
      margin-left: 4px;
      ${typo.value3};
      font-weight: 400;
      color: ${({ theme }) => theme.text.f4};
    }
  }
`;

const ShellWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 100%;
  border-top: 1px solid ${({ theme }) => theme.background.bg4};
`;

const BackButton = styled(TextButton)`
  flex: 0 0 auto;
  width: fit-content;
  ${typo.subtitle3}
  color: ${({ theme }) => theme.text.f4};

  &:hover {
    color: ${({ theme }) => theme.text.f2};
  }
`;

export default ProlbemPage;
