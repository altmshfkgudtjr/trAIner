import Error from 'utils/error';

export type KoreanUnitLimit = '일' | '만' | '억' | '조' | '경';

/**
 * 3자리마다 쉼표 찍어주는 함수
 * @param num 숫자
 */
export const commaFormatter = (num: number) => num.toLocaleString('ko-KR');

/**
 * 한국 돈 단위 변환
 * @param num 숫자
 * @param limit 최대 표시
 * @param options 옵션
 * @param options.ignoreLimitError 최대 표시 에러 스킵
 */
export const koreanMoneyUnit = (
  num: number,
  limit: KoreanUnitLimit = '일',
  options: { ignoreLimitError: boolean } = { ignoreLimitError: false },
) => {
  if (num > Number.MAX_SAFE_INTEGER) {
    if (options.ignoreLimitError) {
      return '0';
    } else {
      // ERROR-TYPE 1
      throw Error({ id: 1, message: '[Formmater] 최대 표시 값을 초과하였습니다.' });
    }
  }

  const numberUnitList: KoreanUnitLimit[] = ['일', '만', '억', '조', '경'];
  const size = num.toString().length;

  const _sign = Math.sign(num) < 0 ? '-' : '';
  let _num = Math.abs(num);
  let _limit = limit;

  if (size / 4 <= numberUnitList.indexOf(_limit)) {
    if (options.ignoreLimitError) {
      _limit = numberUnitList[Math.floor((size - 1) / 4)];
    } else {
      // ERROR-TYPE 4
      throw Error({ id: 4, message: '[Formmater] 최대 표시 단위가 숫자 범위보다 큽니다.' });
    }
  }

  let value = '';
  let index = numberUnitList.indexOf(_limit);
  _num = Math.floor(_num / 10000 ** index);

  while (_num) {
    const str = _num % 10000;
    _num = Math.floor(_num / 10000);

    if (index === 0 && str > 0) {
      value = `${commaFormatter(str)}`;
    } else if (str) {
      value = `${commaFormatter(str)}${numberUnitList[index]} ${value}`;
    }

    index++;
  }

  const output = `${_sign}${value.trim()}`;
  return output || '0';
};
