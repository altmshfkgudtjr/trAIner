import { arrayHelpers } from '..';

describe('[Utils] Array', () => {
  it('특정 길이 배열을 잘 반환하나요?', () => {
    const value1 = arrayHelpers.ArrayByNumber(4);
    const value2 = arrayHelpers.ArrayByNumber(2, { name: 'NB' });

    expect(value1).toEqual([null, null, null, null]);
    expect(value2).toEqual([{ name: 'NB' }, { name: 'NB' }]);
  });

  it('배열의 마지막 아이템을 잘 추출하나요?', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const value = arrayHelpers.GetLastArrayItem(array);

    expect(value).toBe(6);
  });
});
