import styled from 'styled-components';
import { useRef } from 'react';
// components
import Layout from 'components/layouts';
// api
import * as adminAPI from 'api/admin';
// hooks
import useMetaData from 'hooks/commons/useMetaData';
import useAuthWall from 'hooks/commons/useAuthWall';
// styles
import { mediaQuery, typo } from 'tds';

const AdminPage = () => {
  const ctrRef = useRef<HTMLDivElement>(null);
  const deepRef = useRef<HTMLDivElement>(null);
  const hotRef = useRef<HTMLDivElement>(null);
  const similarityRef = useRef<HTMLDivElement>(null);
  const standardRef = useRef<HTMLDivElement>(null);

  const { MetaTitle } = useMetaData();
  const { ValidAuthProvider } = useAuthWall({ isRedirect: true });

  const { data: ctrData } = adminAPI.useCTR_threshold_query();
  const { mutate: ctrMutate } = adminAPI.useCTR_threshold_mutation();
  const { data: deepData } = adminAPI.useDeep_threshold_query();
  const { mutate: deepMutate } = adminAPI.useDeep_threshold_mutation();
  const { data: hotRandomData } = adminAPI.useHotuser_random_query();
  const { mutate: hotRandomMutate } = adminAPI.useHotuser_random_mutation();
  const { data: topicSimilarData } = adminAPI.useTopic_similarity_query();
  const { mutate: topicSimilarMutate } = adminAPI.useTopic_similarity_mutation();
  const { data: coldToHotData } = adminAPI.useColdToHotQuery();
  const { mutate: coldToHotMutate } = adminAPI.useColdToHotMutation();

  return (
    <>
      <MetaTitle contenet="관리자" />

      <Background>
        <ValidAuthProvider>
          <Wrapper>
            <Name>관리자 페이지</Name>

            {ctrData?.result && (
              <Section>
                <Title>CTR Model 기준 임계치</Title>
                <RangeWrapper>
                  <Range
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    onChange={e => {
                      if (!ctrRef.current) {
                        return;
                      }
                      ctrRef.current.innerText = e.target.value;
                      ctrMutate({ value: parseInt(e.target.value, 10) });
                    }}
                    defaultValue={ctrData?.result ?? 0}
                  />
                  <div ref={ctrRef}>{ctrData?.result ?? 0}</div>
                </RangeWrapper>
              </Section>
            )}

            <Section>
              {deepData?.result && (
                <Section>
                  <Title>Deep Model 기준 임계치</Title>
                  <RangeWrapper>
                    <Range
                      type="range"
                      min={0}
                      max={10}
                      step={1}
                      onChange={e => {
                        if (!deepRef.current) {
                          return;
                        }
                        deepRef.current.innerText = e.target.value;
                        deepMutate({ value: parseInt(e.target.value, 10) });
                      }}
                      defaultValue={deepData?.result ?? 0}
                    />
                    <div ref={deepRef}>{deepData?.result ?? 0}</div>
                  </RangeWrapper>
                </Section>
              )}
            </Section>

            <Section>
              {hotRandomData?.result && (
                <Section>
                  <Title>Hot User 추천 Score 가중치</Title>
                  <RangeWrapper>
                    <Range
                      type="range"
                      min={0}
                      max={5}
                      step={0.5}
                      onChange={e => {
                        if (!hotRef.current) {
                          return;
                        }
                        hotRef.current.innerText = e.target.value;
                        hotRandomMutate({ value: parseInt(e.target.value, 10) });
                      }}
                      defaultValue={hotRandomData?.result ?? 0}
                    />
                    <div ref={hotRef}>{hotRandomData?.result ?? 0}</div>
                  </RangeWrapper>
                </Section>
              )}
            </Section>

            <Section>
              {topicSimilarData?.result && (
                <Section>
                  <Title>Topic Model 유사도 가중치</Title>
                  <RangeWrapper>
                    <Range
                      type="range"
                      min={0}
                      max={10}
                      step={1}
                      onChange={e => {
                        if (!similarityRef.current) {
                          return;
                        }
                        similarityRef.current.innerText = e.target.value;
                        topicSimilarMutate({ value: parseInt(e.target.value, 10) });
                      }}
                      defaultValue={topicSimilarData?.result ?? 0}
                    />
                    <div ref={similarityRef}>{topicSimilarData?.result ?? 0}</div>
                  </RangeWrapper>
                </Section>
              )}
            </Section>

            <Section>
              {coldToHotData?.result && (
                <Section>
                  <Title>Cold & Hot 경계 기준</Title>
                  <RangeWrapper>
                    <Range
                      type="range"
                      min={0}
                      max={10}
                      step={1}
                      onChange={e => {
                        if (!standardRef.current) {
                          return;
                        }
                        standardRef.current.innerText = e.target.value;
                        coldToHotMutate({ value: parseInt(e.target.value, 10) });
                      }}
                      defaultValue={coldToHotData?.result ?? 0}
                    />
                    <div ref={standardRef}>{coldToHotData?.result ?? 0}</div>
                  </RangeWrapper>
                </Section>
              )}
            </Section>
          </Wrapper>
        </ValidAuthProvider>
      </Background>
    </>
  );
};

AdminPage.getLayout = page => {
  return <Layout profile={page.props.profile}>{page}</Layout>;
};

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: calc(100% - 32px);
  max-width: 600px;
  height: fit-content;
  margin: auto;
  padding: 32px 16px;
  border: 1px solid ${({ theme }) => theme.border.b2};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background.bg2};

  ${mediaQuery.medium} {
    width: 100%;
    padding: 20px;
  }
`;

const Name = styled.h1`
  ${typo.headline1};
  margin-bottom: 40px;
  color: ${({ theme }) => theme.text.f2};
`;

const Title = styled.h2``;
const Section = styled.section`
  margin-bottom: 40px;

  ${Title} {
    ${typo.headline3};
    color: ${({ theme }) => theme.text.f3};
  }
`;

const RangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > div {
    width: 40px;
    ${typo.value2};
    color: ${({ theme }) => theme.text.f2};
  }
`;

const Range = styled.input`
  &[type='range'] {
    height: 24px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
    background: transparent;
  }
  &[type='range']:focus {
    outline: none;
  }
  &[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #9d74da;
    border-radius: 5px;
    border: 0px solid #000000;
  }
  &[type='range']::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 1px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5.5px;
  }
  &[type='range']:focus::-webkit-slider-runnable-track {
    background: #9d74da;
  }
`;

export default AdminPage;
