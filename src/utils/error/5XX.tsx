/**
 * 상태코드 에러 핸들러
 * @code 500
 */
const handle500 = () => {};

const Error_5XX = {
  500: {
    default: handle500,
  },
};

export default Error_5XX;
