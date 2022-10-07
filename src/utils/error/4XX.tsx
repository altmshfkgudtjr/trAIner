// utils
import * as storageUtils from 'utils/helpers/storage';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'utils/constants/token';

/**
 * 상태코드 에러 핸들러
 * @code 400
 */
export const handle400 = error => {};

/**
 * 상태코드 에러 핸들러
 * @code 401
 */
export const handle401 = error => {
  storageUtils.removeLocalStorage(ACCESS_TOKEN);
  storageUtils.removeLocalStorage(REFRESH_TOKEN);
};

/**
 * 상태코드 에러 핸들러
 * @code 404
 */
export const handle404 = error => {};

const Error_4XX = {
  400: {
    default: handle400,
  },
  401: {
    default: handle401,
  },
  404: {
    default: handle404,
  },
};

export default Error_4XX;
