import Error from 'utils/error';

export const twoDigitPad = (num: number): string => (num < 10 ? '0' + num : `${num}`);

/**
 * Time Formmater
 * @param date 시간
 * @param patternStr 시간 패턴
 */
export const timeFormatter = (date: Date, patternStr: string = 'yyyy.MM.dd') => {
  var day = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    miliseconds = date.getMilliseconds(),
    h = hour % 12,
    hh = twoDigitPad(h),
    HH = twoDigitPad(hour),
    mm = twoDigitPad(minute),
    ss = twoDigitPad(second),
    aaa = hour < 12 ? 'AM' : 'PM',
    dd = twoDigitPad(day),
    M = month + 1,
    MM = twoDigitPad(M),
    yyyy = year + '',
    yy = yyyy.substring(2, 2);

  patternStr = patternStr
    .replace('hh', hh)
    .replace('h', `${h}`)
    .replace('HH', HH)
    .replace('H', `${hour}`)
    .replace('mm', mm)
    .replace('m', `${minute}`)
    .replace('ss', ss)
    .replace('s', `${second}`)
    .replace('S', `${miliseconds}`)
    .replace('dd', dd)
    .replace('d', `${day}`)
    .replace('yyyy', yyyy)
    .replace('yy', yy)
    .replace('aaa', aaa)
    .replace('MM', MM)
    .replace('M', `${M}`);
  return patternStr;
};

/**
 * 분기 반환
 * @param month 월 (1 ~ 12)
 */
export const getQuarter = (month: number | string): Quater => {
  let month_ = 0;
  if (typeof month === 'number') {
    month_ = month;
  } else {
    month_ = parseInt(month, 10);
  }

  if (1 <= month_ && month_ <= 3) {
    return 1;
  } else if (4 <= month_ && month_ <= 6) {
    return 2;
  } else if (7 <= month_ && month_ <= 9) {
    return 3;
  } else {
    return 4;
  }
};

/**
 * 날짜 to Datetime 변환기
 * @param date yyyy-MM-dd 포맷의 날짜
 */
export const getDatetimeFromString = (date: string): Date => {
  const [year, month, day] = date.split('-');

  if (!year || !month || !day) {
    // ERROR-TYPE 3
    throw Error({
      id: 3,
      message: `[Formmater] 인자값의 포맷이 "YYYY-MM-DD" 형태가 아닙니다. \n 인자: "${date}"`,
    });
  }

  return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
};

type Quater = 1 | 2 | 3 | 4;
