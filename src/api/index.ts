import axios from 'axios';
// types
import type { DefaultResponse } from 'axios';

/**
 * URL Replace
 * - next.config.js 프록시 참조
 *
 * @param {string} url
 * @returns {string} URL
 */
const replaceURL = url => {
  let targetURL = url;

  if (url.startsWith('/api/')) {
    targetURL = url.replace('/api/', `${process.env.NEXT_PUBLIC_API_SERVER}/api/`);
  }
  return targetURL;
};

/**
 * Request 성공 handler
 */
const requestSuccessHandler = config => {
  if (process.env.MODE === 'production') {
    Object.assign(config, { url: replaceURL(config.url) });
  }

  /* Next.js ServerSide */
  if (typeof window === 'undefined') {
    return config;
  }

  /* Axios객체 headers에 JWT Token 존재 */
  Object.assign(config.headers, axios.defaults.headers.common);

  return config;
};

/**
 * Request 실패 handler
 */
const requestErrorHandler = err => {
  return Promise.reject(err);
};

/**
 * Response 성공 handler
 */
const responseSuccessHandler = res => {
  const response: DefaultResponse = res.data;

  if (200 <= res.status && res.status < 300) {
    return response as any;
  } else {
    return responseErrorHandler(res);
  }
};

/**
 * Response 실패 handler
 * @param err 에러 객체
 */
const responseErrorHandler = err => {
  return Promise.reject(err);
};

/**
 * Axios 객체
 */
const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Axios Request 미들웨어
 */
request.interceptors.request.use(
  config => requestSuccessHandler(config),
  err => requestErrorHandler(err),
);

/**
 * Axios Response 미들웨어
 */
request.interceptors.response.use(
  res => responseSuccessHandler(res),
  err => responseErrorHandler(err),
);

export default request;
