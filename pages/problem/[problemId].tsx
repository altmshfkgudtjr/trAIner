import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
// components
import ResizableArea from 'components/containers/problem/ResizableArea';
import 문제영역 from 'components/containers/problem/shell/문제영역';
import 풀이영역 from 'components/containers/problem/shell/풀이영역';
// api
import { useProblemQuery } from 'api/problem';
// hooks
import useMetaData from 'hooks/commons/useMetaData';

/** 문제 페이지 */
const ProlbemPage = () => {
  const { query } = useRouter();
  const problemId = query.problemId as string;

  const inputValue = useRef('');

  const { MetaTitle } = useMetaData();
  const { data: problemData } = useProblemQuery({ problemId });

  const onChangeValue = value => {
    inputValue.current = value;
  };

  useEffect(() => {
    if (problemData?.result) {
      // onChangeValue(problemData.result.latest_query);
    }
  }, [problemData]);

  return (
    <>
      <MetaTitle content="문제" />

      <Wrapper>
        <TopWrapper></TopWrapper>

        <ShellWrapper>
          <ResizableArea
            left={<문제영역 problemId={problemId} />}
            right={<풀이영역 initCode={''} onChangeValue={onChangeValue} />}
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
  gap: 8px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
`;

const TopWrapper = styled.div`
  height: 32px;
`;

const ShellWrapper = styled.div`
  flex: 1;
  /* 전체높이 - TopWrapper:height - Wrapper:gap */
  max-height: calc(100% - 32px - 8px);
  border-top: 1px solid ${({ theme }) => theme.background.bg4};
`;

export default ProlbemPage;
