import styled from 'styled-components';
import { useEffect } from 'react';
// components
import Logo from 'components/atoms/Logo';
// hooks
import useSnackbar from 'hooks/dom/useSnackbar';

/** 홈 페이지 */
const HomePage = () => {
  const { initSnackbar } = useSnackbar();

  useEffect(() => {
    initSnackbar({
      type: 'Info',
      title: '반갑습니다',
      message: '새로운 프로젝트입니다.',
    });
  }, [initSnackbar]);

  return (
    <Wrapper>
      <Content>
        <Logo w={240} />
        <p>Comming Soon</p>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  padding: 80px 64px;
  border-radius: 20px;
  background-color: rgba(226, 189, 255, 0.5);
  border: 1px solid rgba(226, 189, 255);
  box-shadow: 0 0 48px 24px rgba(226, 189, 255, 0.2);
  text-align: center;
  transition: 0.2s ease;

  &:hover {
    box-shadow: 0 0 16px 8px rgba(226, 189, 255, 0.2);
  }

  p {
    margin-top: 12px;
    font-weight: 500;
  }
`;

export default HomePage;
