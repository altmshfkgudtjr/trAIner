import { timeHelpers } from '..';

describe('[Utils] Time', () => {
  it('시간포맷을 잘 표시하나요?', () => {
    const dummyData = new Date('2022-07-07');
    const value = timeHelpers.timeFormatter(dummyData, 'yyyy-MM-dd');

    expect(value).toBe('2022-07-07');
  });

  it('분기를 잘 반환하나요?', () => {
    const value1 = timeHelpers.getQuarter(10);
    const value2 = timeHelpers.getQuarter(2);
    const value3 = timeHelpers.getQuarter('5');

    expect(value1).toBe(4);
    expect(value2).toBe(1);
    expect(value3).toBe(2);
  });

  it('문자열 날짜를 잘 변환하나요??', () => {
    const dummyData = '2022-07-07';
    const value = timeHelpers.getDatetimeFromString(dummyData);

    expect(value).toEqual(new Date(2022, 6, 7));
  });
});
