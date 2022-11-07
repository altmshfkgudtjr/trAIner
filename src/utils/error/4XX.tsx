import request from 'api';
// utils
import * as storageUtils from 'utils/helpers/storage';
import { REFRESH_TOKEN } from 'utils/constants/token';

let isPassAPI = false;

/** Refresh API 호출가능 여부 설정 함수 */
const onEanbledRefresh = (value: boolean) => (isPassAPI = value);

/**
 * 상태코드 에러 핸들러
 * @code 400
 */
export const handle400 = () => {};

/**
 * 상태코드 에러 핸들러
 * @code 401
 */
export const handle401 = error => {
  if (isPassAPI) {
    return error;
  } else {
    onEanbledRefresh(true);
  }

  const refreshTokenBySession = storageUtils.getSessionStorage(REFRESH_TOKEN);
  const refreshTokenByLocal = storageUtils.getLocalStorage(REFRESH_TOKEN);
  const refreshToken = refreshTokenBySession || refreshTokenByLocal;

  if (!refreshToken) {
    storageUtils.removeLocalStorage(REFRESH_TOKEN);
    storageUtils.removeSessionStorage(REFRESH_TOKEN);
    return error;
  }

  request
    .post<{ result: { refreshToken: string } }>(`/api/refresh-token`, {
      headers: {
        RefreshToken: refreshToken,
      },
    })
    .then(res => {
      if (refreshTokenBySession) {
        storageUtils.saveSessionStorage(REFRESH_TOKEN, res.result.refreshToken);
      } else if (refreshTokenByLocal) {
        storageUtils.saveLocalStorage(REFRESH_TOKEN, res.result.refreshToken);
      }
    })
    .catch(() => {
      storageUtils.removeLocalStorage(REFRESH_TOKEN);
      storageUtils.removeSessionStorage(REFRESH_TOKEN);
    })
    .finally(() => {
      onEanbledRefresh(false);
    });
};

/**
 * 상태코드 에러 핸들러
 * @code 404
 */
export const handle404 = () => {};

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
