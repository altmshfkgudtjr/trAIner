import { useEffect } from 'react';
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

  return <></>;
};

export default HomePage;
