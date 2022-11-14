import styled from 'styled-components';
import Router, { useRouter } from 'next/router';
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { isBefore, parseISO } from 'date-fns';
// components
import Layout from 'components/layouts';
import { MainLayout } from 'tds/layouts';
import ResizableArea from 'components/containers/problem/ResizableArea';
import 문제영역 from 'components/containers/problem/shell/문제영역';
import 풀이영역 from 'components/containers/problem/shell/풀이영역';
import 출력영역 from 'components/containers/problem/shell/출력영역';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
// import * as useProblemController from 'hooks/controllers/useProblemController';
// import * as useWeekController from 'hooks/controllers/useWeekController';

/** 문제 페이지 */
const ProlbemPage = () => {
  const { query } = useRouter();
  const classId = parseInt(query.classId as string, 10);
  const weekId = parseInt(query.weekId as string, 10);
  const problemId = parseInt(query.problemId as string, 10);

  const inputValue = useRef('');
  const [status, setStatus] = useState<'Before' | 'Ing' | 'After' | null>(null);

  const { MetaTitle } = useMetaData();
  // const { data: problemData } = useProblemController.GetProblem(problemId);
  const problemData = {};

  const onChangeValue = value => {
    inputValue.current = value;
  };

  const onExit = useCallback(() => {
    setStatus('After');
    alert('시험이 종료되었습니다.');
    Router.push(`/dashboard/${classId}/${weekId}`);
  }, [classId, weekId]);

  useEffect(() => {
    if (problemData?.result) {
      onChangeValue(problemData.result.latest_query);
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
            top={
              <풀이영역
                initQuery={problemData?.result?.latest_query}
                onChangeValue={onChangeValue}
              />
            }
            bottom={
              <출력영역
                weekId={weekId}
                problemId={problemId}
                getUserQuery={() => inputValue.current}
              />
            }
          />
        </ShellWrapper>
      </Wrapper>
    </>
  );
};

ProlbemPage.getLayout = page => {
  return <Layout profile={page.props.profie}>{page}</Layout>;
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
  height: 100vh;
`;

const TopWrapper = styled.div`
  height: 60px;
`;

const ShellWrapper = styled.div`
  flex: 1;
  max-height: calc(100% - 36px - 16px);
  border-top: 1px solid ${({ theme }) => theme.background.bg4};
`;

export default ProlbemPage;
