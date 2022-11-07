import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <Wrapper>
      <ItemWrapper>
        <Item />
        <Item />
        <Item />
        <Item />
      </ItemWrapper>
    </Wrapper>
  );
};

const loading1 = keyframes`
	0% {
		transform: scale(0);
	}
	100% {
		transform: scale(1);
	}
`;

const loading2 = keyframes`
	0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const loading3 = keyframes`
	0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ItemWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const Item = styled.div`
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  animation-timing-function: cubic-bezier(0, 1, 1, 0);

  &:nth-child(1) {
    left: 8px;
    animation: ${loading1} 0.6s infinite;
  }

  &:nth-child(2) {
    left: 8px;
    animation: ${loading2} 0.6s infinite;
  }

  &:nth-child(3) {
    left: 32px;
    animation: ${loading2} 0.6s infinite;
  }

  &:nth-child(4) {
    left: 56px;
    animation: ${loading3} 0.6s infinite;
  }
`;

export default Loading;
