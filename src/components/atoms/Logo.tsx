import styled from 'styled-components';
// styles
import { mediaQuery } from 'tds';

/**
 * 로고
 * @param props
 * @param props.w 가로 길이
 * @param props.h 세로 길이
 */
const Logo = ({ w, h }: Props) => {
  return (
    <Link href="/">
      <Image src={`/logo/primary.png`} alt={`${process.env.NEXT_PUBLIC_BRAND_ENG}`} w={w} h={h} />
      <ImageMobile
        src={`/logo/primary-simple.png`}
        alt={`${process.env.NEXT_PUBLIC_BRAND_ENG}`}
        w={w}
        h={h}
      />
    </Link>
  );
};

const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img<{
  w?: number;
  h?: number;
}>`
  display: none;
  max-width: ${({ w }) => (w ? `${w}px` : 'auto')};
  max-height: ${({ h }) => (h ? `${h}px` : 'auto')};

  ${mediaQuery.medium} {
    display: block;
  }
`;
const ImageMobile = styled(Image)`
  display: block;

  ${mediaQuery.medium} {
    display: none;
  }
`;

type Props = {
  w?: number;
  h?: number;
};

export default Logo;
