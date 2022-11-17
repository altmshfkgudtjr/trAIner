import styled, { useTheme } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import Loading from 'components/atoms/Loading';
// componentss
import Badge from 'components/presenters/problem/shell/Badge';
// utils
import { getCookieFromClient } from 'utils/helpers/cookie';

const 풀이영역 = ({ initCode, onChangeValue }: Props) => {
  const currentTheme = useTheme();

  const editorRef = useRef(null);
  const [code, setCode] = useState('');

  const onClick = () => {
    const target: any = document.querySelector('[contenteditable]');
    if (!target) {
      return;
    }

    target.focus();
  };

  const onMoutEditor: OnMount = (editor, monaco) => {
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
      setCode(`def add(a, b):\n    return a + b\n}`);
    }
  }, [initCode]);

  return (
    <Wrapper onClick={onClick}>
      <BadgeWrapper>
        <Badge text="쿼리 작성" />
      </BadgeWrapper>

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
          onMount={onMoutEditor}
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

const BadgeWrapper = styled.div`
  padding: 20px 20px 0 20px;
  margin-bottom: 16px;
`;

const EditorWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;

type Props = {
  initCode?: string;
  onChangeValue: (value: string) => void;
};

export default 풀이영역;
