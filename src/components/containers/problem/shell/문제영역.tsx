import styled from 'styled-components';
// components
import Badge from 'components/presenters/problem/shell/Badge';
import ProblemTitle from 'components/presenters/problem/shell/ProblemTitle';
import ProblemContent from 'components/presenters/problem/shell/ProblemContent';
import QueryTable from 'components/presenters/problem/shell/QueryTable';
// hooks
// import * as useProblemController from 'hooks/controllers/useProblemController';
// styles
import { typo } from 'tds';

/**
 * 문제영역
 * @param props
 * @param props.problemId 문제 ID
 */
const 문제영역 = ({ problemId }: Props) => {
  // const { status, data } = useProblemController.GetProblem(problemId);
  const status = 'success';
  const data = {};

  return (
    <Wrapper>
      {status === 'success' && (
        <>
          <TitleWrapper>
            <ProblemTitle title={data?.result?.title} />
          </TitleWrapper>

          <Badge text="문제 설명" />

          <ProblemContent content={data?.result?.content} />

          <DescTableWrapper>
            <Badge text="테이블 설명" />

            {data?.result?.desc_table.map((desc, idx) => (
              <DescTable key={idx}>
                <div>
                  {desc.table_name}
                  <span>테이블명</span>
                </div>
                <QueryTable data={desc.value} />
              </DescTable>
            ))}
          </DescTableWrapper>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section``;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 16px;
`;

const DescTableWrapper = styled.div`
  margin-top: 32px;
  padding-top: 32px;
  padding-bottom: 200px;
`;

const DescTable = styled.div`
  width: fit-content;
  padding-right: 32px;
  margin-bottom: 32px;

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    ${typo.value2};
    color: ${({ theme }) => theme.primary};
    padding: 4px 8px;
    background-color: ${({ theme }) => theme.background.bg4};
    border-top: 1px solid ${({ theme }) => theme.border.b2};
    border-left: 1px solid ${({ theme }) => theme.border.b2};
    border-right: 1px solid ${({ theme }) => theme.border.b2};

    & > span {
      ${typo.value4};
      color: ${({ theme }) => theme.text.f3};
    }
  }
`;

type Props = {
  problemId: number;
};

export default 문제영역;
