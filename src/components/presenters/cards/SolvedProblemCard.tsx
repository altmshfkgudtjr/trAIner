import styled, { css, useTheme } from 'styled-components';
import Link from 'next/link';
import { useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
// components
import Loading from 'components/atoms/Loading';
import ProblemBadge from 'components/atoms/ProblemBadge';
// utils
import { getCookieFromClient } from 'utils/helpers/cookie';
// styles
import { typo, mediaQuery, lib } from 'tds';
// types
import type { SolvedProblem } from 'types/api/problem';

/**
 * 문제 카드
 */
const SolvedProblemCard = ({ problem }: Props) => {
  const currentTheme = useTheme();

  const editorRef = useRef(null);

  const problemType = problem.level < 8 ? 'Easy' : problem.level < 11 ? 'Normal' : 'Hard';

  const initRandomColor = (key: string) => {
    let h = key.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 360;
    return `hsl(${h}, 60%, 60%)`;
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

  return (
    <Wrapper>
      <SubmitTime>
        <span>제출 시간:</span> {problem.created_at}
      </SubmitTime>
      <Layout>
        <Link href={`/problem/${problem.problemId}`}>
          <ProblemWrapper>
            <div>
              <BadgeWrapper>
                <ProblemBadge type={problemType}>LV.{problem.level}</ProblemBadge>
                문제번호: {problem.problemId}
              </BadgeWrapper>

              {problem.titleKo}
              {problem.tags?.length > 0 && (
                <>
                  <Name>분류</Name>
                  <TagWrapper>
                    {problem.tags.map(tag => (
                      <Tag key={tag} color={initRandomColor(tag)}>
                        {tag}
                      </Tag>
                    ))}
                  </TagWrapper>
                </>
              )}
            </div>
            <Result isPass={problem.result}>
              <p>{problem.executionTime && <>실행시간: {problem.executionTime}ms</>}</p>
              <span>{problem.result ? '맞았습니다!' : '틀렸습니다.'}</span>
            </Result>
          </ProblemWrapper>
        </Link>

        <EditorWrapper>
          <MonacoEditor
            width="100%"
            height="100%"
            defaultLanguage="python"
            defaultValue={problem.code ?? ''}
            loading={<Loading />}
            options={{
              readOnly: true,
              automaticLayout: true,
              minimap: {
                enabled: false,
              },
            }}
            onMount={onMountEditor}
          />
        </EditorWrapper>
      </Layout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SubmitTime = styled.p`
  ${typo.badge};
  color: ${({ theme }) => theme.text.f2};

  span {
    color: ${({ theme }) => (theme.themeType === 'light' ? theme.text.f3 : theme.text.f4)};
  }
`;

const Layout = styled.div`
  display: block;
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px;
  width: 100%;

  ${mediaQuery.medium} {
    display: flex;
  }
`;

const ProblemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: auto;
  height: 240px;
  padding: 16px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.background.bg4};
  ${typo.headline3};
  color: ${({ theme }) => theme.text.f2};
  word-break: keep-all;
  overflow: hidden;
  transition: 0.2s ease;

  ${mediaQuery.medium} {
    flex: 0 0 auto;
    width: 300px;
    height: 300px;
    padding: 24px;
    border-radius: 8px;
    ${typo.headline1};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    pointer-events: none;
    opacity: 0;
    transition: 0.2s ease;
  }

  ${lib.onlyHover(css`
    &::after {
      opacity: 0.2;
    }
  `)};

  &:active {
    transform: scale(0.98, 0.98);
  }
`;

const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
  ${typo.badge};
  color: ${({ theme }) => (theme.themeType === 'light' ? theme.text.f3 : theme.text.f4)};
`;

const Name = styled.div`
  margin-top: 12px;
  ${typo.subtitle3};
  color: ${({ theme }) => (theme.themeType === 'light' ? theme.text.f3 : theme.text.f4)};
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const Tag = styled.span<{ color: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid ${({ color }) => color};
  color: ${({ theme }) => theme.text.f2};
  ${typo.badge};
`;

const Result = styled.div<{ isPass: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${typo.value2};

  p {
    color: ${({ theme }) => (theme.themeType === 'light' ? theme.text.f3 : theme.text.f4)};
  }

  span {
    font-weight: 500;
    color: ${({ isPass, theme }) => (isPass ? theme.semantic.success : theme.semantic.danger)};
  }
`;

const EditorWrapper = styled.div`
  display: none;
  flex: 1;
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;

  ${mediaQuery.medium} {
    display: block;
  }
`;

type Props = {
  problem: SolvedProblem;
};

export default SolvedProblemCard;
