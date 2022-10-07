export { default as Error_4XX } from './4XX';
export { default as Error_5XX } from './5XX';

/**
 * 에러
 * - Develop 모드와 Production 모드에 따라서 표시 구문이 달라집니다.
 * @param props
 * @param props.id 에러 ID
 * @param props.message 에러 메세지
 * @param props.content 에러 객체
 *
 * @example
 * // ERROR-TYPE <넘버링>
 * Error({ id: <넘버링>, message: "[Formmater] 범위 초과" });
 */
const Error = ({ id, message, content }: Props) => {
  const isProd = process.env.NODE_ENV === 'production';

  const obj = { id: `ERR-${id}` };

  if (isProd) {
    console.warn(
      '예상치 못한 에러가 발생하였습니다.\n개발팀으로 문의주시면 감사하겠습니다.\n',
      obj,
    );
  } else {
    message && Object.assign(obj, { message });
    content && Object.assign(obj, { content });

    console.error(`오류가 발생하였습니다. "ERR-${id}" 에러를 수정해주세요!`, obj);
  }
};

/**
 * API 에러 로그 포맷
 * - Only Development Mode
 * @param err Axios Response Error Object
 */
export const axiosErrorLogFormat = err => {
  const {
    response: { status: statusCode },
  } = err;

  if (process.env.NODE_ENV === 'development') {
    Promise.reject(`${err.name} - ${err.message}

[에러코드]
• ${statusCode}

[메소드]
• ${err.config.method.toUpperCase()}

[URL]
• ${err.request.responseURL}

[반환값]
${
  typeof err.response.data === 'string'
    ? err.response.data.slice(0, 150) + '...더 읽기'
    : JSON.stringify(err.response.data, undefined, 2)
}

`);
  }

  return err;
};

type Props = {
  id: number;
  message?: string;
  content?: object;
};

export default Error;
