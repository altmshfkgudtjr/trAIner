import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
// components
import { TextButton } from 'tds/components/buttons';
import Layout from 'components/layouts';
import LanguageImage from 'public/languages.webp';
// styles
import { mediaQuery, typo } from 'tds';

/** 홈 페이지 */
const HomePage = () => {
  return (
    <Wrapper>
      <Section>
        <Title>
          <EffectTitle>알고리즘</EffectTitle> 공부
          <br />
          <EffectTitle>트레이너</EffectTitle> 로 매듭짓다<span>.</span>
          <br />
          <br />
          <Link href="/problems" style={{ display: 'flex' }}>
            <Button size="Large">문제 추천받기</Button>
          </Link>
        </Title>
      </Section>

      <Section>
        <Title style={{ textAlign: 'center' }}>
          선호 언어인 <EffectTitle>파이썬</EffectTitle> 을
          <br />
          기본 언어로 탑재
        </Title>
        <br />
        <ImageWrapper>
          <div>
            <Image src={LanguageImage} alt="코딩 언어" fill priority />
          </div>
        </ImageWrapper>
      </Section>
    </Wrapper>
  );
};
HomePage.getLayout = page => {
  return <Layout profile={page.props.profile}>{page}</Layout>;
};

const Blink = keyframes`
	0% { opacity: 1; }
	59% { opacity: 1; }
	60% { opacity: 0; }
	100% { opacity: 0; }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const EffectTitle = styled.strong``;
const Title = styled.h1`
  ${typo.Big1};
  color: ${({ theme }) => theme.text.f2};

  ${mediaQuery.medium} {
    font-size: 64px;
    line-height: 72px;
  }

  ${EffectTitle} {
    background: linear-gradient(to right, #4608a2, #9565dc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  span {
    opacity: 0;
    animation: 0.8s ${Blink} linear infinite;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  overflow: hidden;

  & > div {
    position: relative;
    min-width: 866px;
    height: 154px;
  }
`;

const Button = styled(TextButton)`
  flex: 0 auto;
  width: 140px;
  margin: auto;
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
`;

export default HomePage;
