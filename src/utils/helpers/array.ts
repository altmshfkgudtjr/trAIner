/**
 * 특정 길이 배열 반환
 * @param num 배열 길이
 * @param defaultValue 배열 초기값
 */
export const ArrayByNumber = <T>(num: number, defaultValue: T | null = null): Array<T> => {
  return new Array(num).fill(defaultValue);
};

/**
 * 배열 마지막 아이템 추출
 * - 빈 배열이면 null이 추출됩니다.
 * @param arr 배열
 */
export const GetLastArrayItem = <T>(arr: T[]): T | null => {
  if (arr.length === 0) {
    return null;
  }
  return arr[arr.length - 1];
};
