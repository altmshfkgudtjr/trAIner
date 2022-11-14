import { useQuery, useMutation } from '@tanstack/react-query';
import request from 'api';
// utils
import { REFRESH_TOKEN } from 'utils/constants/token';
import {
  saveLocalStorage,
  removeLocalStorage,
  saveSessionStorage,
  removeSessionStorage,
} from 'utils/helpers/storage';
// types
import type { AxiosError } from 'axios';
import type * as types from 'types/api/user';

/**
 * 내 정보 조회
 * @query
 * @version 1
 */
export const useProfileQuery = (props?: Select<types.ProfileQuery, 'Props'>) => {
  return useQuery<Select<types.ProfileQuery, 'Response'>, AxiosError>(
    ['useProfileQuery'],
    () => request.get(`/api/v1/users/me`),
    { ...props?.options },
  );
};

/**
 * 사용자 조회
 * @query
 * @version 1
 */
export const useUserQuery = (props?: Select<types.UserQuery, 'Props'>) => {
  return useQuery<Select<types.UserQuery, 'Response'>, AxiosError>(
    ['useUserQuery', props?.userId],
    () => request.get(`/api/v1/users/${props?.userId}`),
    { ...props?.options },
  );
};

/**
 * 로그인
 * @mutation
 */
export const useSignInMutation = (props?: Select<types.SignInMutation, 'Props'>) => {
  return useMutation<
    Select<types.SignInMutation, 'Response'>,
    AxiosError,
    Select<types.SignInMutation, 'Variables'>
  >(data => request.post(`/api/auth/sign-in`, data), {
    ...props?.options,
    onSuccess: (res, ...rest) => {
      if (rest[0].isPersist) {
        saveLocalStorage(REFRESH_TOKEN, res.result.refresh_token);
      } else {
        saveSessionStorage(REFRESH_TOKEN, res.result.refresh_token);
      }
      props?.options?.onSuccess && props.options.onSuccess(res, ...rest);
    },
    onError: (res, ...rest) => {
      removeLocalStorage(REFRESH_TOKEN);
      removeSessionStorage(REFRESH_TOKEN);
      props?.options?.onError && props.options.onError(res, ...rest);
    },
  });
};

/**
 * 로그아웃
 * @mutation
 */
export const useSignOutMutation = (props?: Select<types.SignOutMutation, 'Props'>) => {
  return useMutation<
    Select<types.SignOutMutation, 'Response'>,
    AxiosError,
    Select<types.SignOutMutation, 'Variables'>
  >(() => request.post(`/api/auth/sign-out`), {
    ...props?.options,
    onSuccess: (res, ...rest) => {
      removeLocalStorage(REFRESH_TOKEN);
      removeSessionStorage(REFRESH_TOKEN);
      props?.options?.onSuccess && props.options.onSuccess(res, ...rest);
    },
    onError: (res, ...rest) => {
      removeLocalStorage(REFRESH_TOKEN);
      removeSessionStorage(REFRESH_TOKEN);
      props?.options?.onError && props.options.onError(res, ...rest);
    },
  });
};

/**
 * 회원가입
 * @mutation
 * @version 1
 */
export const useSignUpMutation = (props?: Select<types.SignUpMutation, 'Props'>) => {
  return useMutation<
    Select<types.SignUpMutation, 'Response'>,
    AxiosError,
    Select<types.SignUpMutation, 'Variables'>
  >(data => request.post(`/api/v1/sign-up`, data), {
    ...props?.options,
    onSuccess: (res, ...rest) => {
      saveSessionStorage(REFRESH_TOKEN, res.result.refresh_token);
      props?.options?.onSuccess && props.options.onSuccess(res, ...rest);
    },
    onError: (res, ...rest) => {
      removeSessionStorage(REFRESH_TOKEN);
      props?.options?.onError && props.options.onError(res, ...rest);
    },
  });
};

/**
 * JWT 토큰 갱신
 * @mutation
 * @link
 * @version 1
 */
export const useRefreshTokenMutation = (props?: Select<types.RefreshTokenMutation, 'Props'>) => {
  return useMutation<
    Select<types.RefreshTokenMutation, 'Response'>,
    AxiosError,
    Select<types.RefreshTokenMutation, 'Variables'>
  >(() => request.post(`/api/refresh-token`), {
    ...props?.options,
  });
};
