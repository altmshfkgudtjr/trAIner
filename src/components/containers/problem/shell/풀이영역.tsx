import styled from 'styled-components';
// componentss
import Badge from 'components/presenters/problem/shell/Badge';
import CodeEditor from 'components/presenters/problem/shell/CodeEditor';

const 풀이영역 = ({ initQuery, onChangeValue }: Props) => {
  const onClick = () => {
    const target: any = document.querySelector('[contenteditable]');
    if (!target) {
      return;
    }

    target.focus();
  };

  return (
    <Wrapper onClick={onClick}>
      <Badge text="쿼리 작성" />

      <CodeEditor defaultValue={initQuery} onChangeValue={onChangeValue} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: fit-content;
  min-width: 100%;
  height: 100%;
  overflow-x: auto;
  cursor: text;
`;

type Props = {
  initQuery?: string;
  onChangeValue: (value: string) => void;
};

export default 풀이영역;
