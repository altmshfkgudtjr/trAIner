/**
 * Object 객체를 FormData 객체로 변환해주는 함수
 * @param obj
 * @returns {FormData}
 */
export const createFormdata = (obj: object) => {
  const formdata = new FormData();
  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key])) {
      // @ts-ignore
      formdata.append(key, ...obj[key]);
    } else {
      formdata.append(key, obj[key]);
    }
  });
  return formdata;
};
