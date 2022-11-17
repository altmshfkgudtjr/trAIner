import { useEffect } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
// components
import Loading from 'components/atoms/Loading';
// api
import { useProfileQuery } from 'api/user';

/**
 * 로그인이 되어있지 않으면, 로그인 페이지로 이동시키는 훅
 */
const useAuthWall = ({ isRedirect }: Props) => {
  const { status: userStatus, data: userData } = useProfileQuery();

  useEffect(() => {
    if (userStatus !== 'loading' && !userData && isRedirect) {
      Router.replace({
        pathname: '/sign-in',
        query: {
          redirect: Router.asPath,
        },
      });
    } else if (userStatus !== 'loading' && !userData && !isRedirect) {
      // TODO: 로그인 모달 띄우기
    }
  }, [isRedirect, userData, userStatus]);

  return {
    ValidAuthProvider: ({ children }) =>
      userStatus === 'success' ? (
        children
      ) : (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ),
  };
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

type Props = {
  /** 리다이렉트 여부 */
  isRedirect: boolean;
};

export default useAuthWall;
