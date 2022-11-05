import styled from 'styled-components';
import Image from 'next/image';
import SymbolImage from 'public/logo/primary-simple.png';
import WhiteSymbolImage from 'public/logo/white-simple.png';

/**
 * 심볼
 * @param props
 * @param props.type 타입
 * @param props.w 가로 길이
 * @param props.h 세로 길이
 * @param props.isLinking a 태그 여부
 * @param props.isLinking 배경 여부
 */
const Symbol = ({ type = 'Color', w, h, isLinking = true }: Props) => {
  const symbolURL = type === 'Color' ? SymbolImage : WhiteSymbolImage;

  const Layout = ({ children }) => {
    if (isLinking) {
      return <Link href="/">{children}</Link>;
    }
    return <Wrapper>{children}</Wrapper>;
  };

  return (
    <Layout>
      <Image
        src={symbolURL}
        alt={`${process.env.NEXT_PUBLIC_BRAND_ENG} 로고`}
        width={w}
        height={h}
      />
    </Layout>
  );
};

const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img<{
  w?: number;
  h?: number;
}>`
  width: ${({ w }) => (w ? `${w}px` : '100%')};
  height: ${({ h }) => (h ? `${h}px` : '100%')};
`;

type Props = {
  type?: 'Color' | 'White';
  w?: number;
  h?: number;
  isLinking?: boolean;
  isBackground?: boolean;
};

export default Symbol;
