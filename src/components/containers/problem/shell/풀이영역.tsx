import styled, { useTheme } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import Loading from 'components/atoms/Loading';
import { FillButton } from 'tds/components/buttons';
// componentss
import Badge from 'components/presenters/problem/shell/Badge';
// api
import { useSubmitProblemMutation } from 'api/problem';
// hooks
import useSnackbar from 'hooks/dom/useSnackbar';
import useModal from 'hooks/dom/useModal';
// utils
import { getCookieFromClient } from 'utils/helpers/cookie';
import { typo } from 'tds';

const 풀이영역 = ({ problemId, initCode, onChangeValue }: Props) => {
  const currentTheme = useTheme();

  const editorRef = useRef(null);
  const [code, setCode] = useState('');

  const { mutate: submitMutate, status: submitStatus } = useSubmitProblemMutation();

  const { initSnackbar } = useSnackbar();
  const { pushModal } = useModal();

  const onSubmit = () => {
    submitMutate(
      { problemId, code },
      {
        onSuccess: data => {
          pushModal({
            name: 'SubmitResultModal',
            args: {
              result: data.result.result,
              executionTime: data.result.executionTime,
            },
          });

          if (data.result.result) {
            initSnackbar({
              type: 'Success',
              title: 'CLEAR',
              message: '축하합니다! 정답입니다!',
            });
          } else {
            initSnackbar({
              type: 'Danger',
              title: 'WRONG',
              message: '테스트 케이스에 통과하지 못하였습니다.',
            });
          }
        },
      },
    );
  };

  const onMountEditor: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    monaco.editor.defineTheme('trainer-light', {
      base: 'vs',
      inherit: true,
      rules: [{ background: currentTheme.background.bg2 }],
      colors: {
        'editor.background': currentTheme.background.bg2,
      },
    });

    monaco.editor.defineTheme('trainer-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [{ background: currentTheme.background.bg2 }],
      colors: {
        'editor.background': currentTheme.background.bg2,
      },
    });

    const theme = getCookieFromClient('theme');
    if (theme === 'light') {
      monaco.editor.setTheme('trainer-light');
    } else {
      monaco.editor.setTheme('trainer-dark');
    }
  };

  useEffect(() => {
    if (initCode) {
      setCode(initCode);
    } else {
      setCode(`def add(a, b):\n    return a + b`);
    }
  }, [initCode]);

  return (
    <Wrapper>
      <TopWrapper>
        <Badge text="코드 작성" />
        <SubmitButton size="ExtraSmall" onClick={onSubmit} disabled={submitStatus === 'loading'}>
          {submitStatus !== 'loading' && '제출하기'}
          {submitStatus === 'loading' && '제출 중'}
        </SubmitButton>
      </TopWrapper>

      <EditorWrapper>
        <MonacoEditor
          width="100%"
          height="100%"
          defaultLanguage="python"
          defaultValue={code}
          loading={<Loading />}
          onChange={v => {
            if (v) {
              setCode(v);
              onChangeValue(v);
            }
          }}
          options={{
            automaticLayout: true,
            minimap: {
              enabled: false,
            },
          }}
          onMount={onMountEditor}
        />
      </EditorWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: fit-content;
  min-width: 100%;
  height: 100%;
  overflow-x: auto;
  cursor: text;
`;

const SubmitButton = styled(FillButton)``;
const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px 0 20px;
  margin-bottom: 16px;

  ${SubmitButton} {
    flex: 0 0 auto;
    height: 32px;
    ${typo.badge}
    color: ${({ theme }) => theme.text.f2};

    &:disabled {
      background-color: transparent;
      color: ${({ theme }) => theme.text.f4};
    }
  }
`;

const EditorWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;

type Props = {
  problemId: string;
  initCode?: string;
  onChangeValue: (value: string) => void;
};

export default 풀이영역;
