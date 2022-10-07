import { axiosErrorLogFormat } from 'utils/error';
import { Error_4XX, Error_5XX } from 'utils/error';

/**
 * 공통 에러 핸들러
 */
const commonHandler = error => {
  axiosErrorLogFormat(error);
};

/**
 * 기본 에러 핸들러
 */
const defaultHandler = error => {};

/**
 * 기본 에러 핸들러
 */
const erroHandlers = {
  common: commonHandler,
  default: defaultHandler,
  ...Error_4XX,
  ...Error_5XX,
};

/**
 * 에러 핸들러 Hook
 */
const apiErrorHandler = (handlers?: any) => {
  const handleError = error => {
    const httpStatus = error.response?.status;
    const serviceCode = error.response?.error?.code?.split('-')[2];

    switch (true) {
      case !!handlers?.[httpStatus]?.[serviceCode]:
        // 우선순위 1. 컴포넌트에서 (HTTP Status, 서비스 표준 에러 Code) Key 조합으로 재정의한 핸들러
        handlers[httpStatus][serviceCode](error);
        break;
      case !!handlers?.[httpStatus]:
        // 우선순위 2. 컴포넌트에서 (HTTP Status) Key로 재정의한 핸들러
        handlers[httpStatus].default(error);
        break;
      case !!erroHandlers[httpStatus]?.[serviceCode]:
        // 우선순위 3. Hook에서 (HTTP Status, 서비스 표준 에러 Code) Key 조합으로 정의한 핸들러
        erroHandlers[httpStatus][serviceCode](error);
        break;
      case !!erroHandlers[httpStatus]:
        // 우선순위 4. Hook에서 (HTTP Status) Key로 정의한 핸들러
        erroHandlers[httpStatus].default(error);
        break;
      default:
        // 우선순위 5. 어디에서도 정의되지 못한 에러를 처리하는 핸들러
        erroHandlers.default(error);
    }

    // 공통 처리 로직 수행
    erroHandlers.common(error);
  };

  return { handleError };
};

export default apiErrorHandler;
