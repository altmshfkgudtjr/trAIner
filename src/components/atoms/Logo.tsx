import styled from 'styled-components';
import Image from 'next/image';
// hooks
import useMatchMedia from 'hooks/dom/useMatchMedia';
// public
import LogoImage from 'public/logo/primary.png';
import SymbolImage from 'public/logo/primary-simple.png';
import WhiteLogoImage from 'public/logo/white.png';
import WhiteSymbolImage from 'public/logo/white-simple.png';

/**
 * 로고
 */
const Logo = ({ type = 'White', width, height }: Props) => {
  const isDesktop = useMatchMedia({ media: 'medium' });

  return (
    <Wrapper>
      <LogoLink href="/">
        <Image
          src={
            type === 'White'
              ? isDesktop
                ? LogoImage
                : SymbolImage
              : isDesktop
              ? WhiteLogoImage
              : WhiteSymbolImage
          }
          alt="logo"
          width={width}
          height={height}
          priority
          placeholder="empty"
        />
      </LogoLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  type?: 'White' | 'Black';
  width?: number;
  height?: number;
};

export default Logo;
