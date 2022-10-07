// TODO 정렬 Util 테스트 코드 작성

/**
 * 문자열 아이템 정렬
 */
export const sortByString = <T extends string>(a: T, b: T, order: 'ASC' | 'DESC') => {
  const x = a.toLowerCase();
  const y = b.toLowerCase();

  if (x < y) {
    return order === 'ASC' ? -1 : 1;
  }

  if (x > y) {
    return order === 'ASC' ? 1 : -1;
  }

  return 0;
};

/**
 * 정수 아이템 정렬
 */
export const sortByNumber = <T extends number>(a: T, b: T, order: 'ASC' | 'DESC') => {
  return order === 'ASC' ? a - b : b - a;
};

/**
 * 정렬 헬퍼 함수
 */
export const sorted = <T>(a: T, b: T, order: 'ASC' | 'DESC') => {
  if (typeof a === 'string' && typeof b === 'string') {
    return sortByString(a, b, order);
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return sortByNumber(a, b, order);
  }

  return 0;
};
