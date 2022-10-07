import { RecoilRoot } from 'recoil';

/** 상태 Provider */
const RecoilProvider = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
