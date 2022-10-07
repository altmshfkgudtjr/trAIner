import { initRandomChar } from '../random';

describe('[Utils] 랜덤', () => {
  it('특정 길이의 랜덤 문자열 뽑아내나요?', () => {
    const value1 = initRandomChar(8);
    const value2 = initRandomChar(8);

    expect(value1 !== value2).toBeTruthy();
    expect(value1.length).toBe(8);
  });
});
