import { formatHelpers } from '..';

describe('[Utils] Format', () => {
  it('세자리마다 쉼표가 잘 찍히나요?', () => {
    const value = formatHelpers.commaFormatter(111_111_111);

    expect(value).toBe('111,111,111');
  });

  it('한국 돈 단위가 잘 변환되나요?', () => {
    const value1 = formatHelpers.koreanMoneyUnit(100_000_000, '억');
    const value2 = formatHelpers.koreanMoneyUnit(100_000_000, '조', { ignoreLimitError: true });

    expect(value1).toBe('1억');
    expect(value2).toBe('1억');
  });

  it('한국 돈 단위가 초과했을 때, 에러를 발생시키나요?', () => {
    console.error = jest.fn();

    const errorFunction = () => formatHelpers.koreanMoneyUnit(100_000_000, '조');
    expect(errorFunction).toThrow();

    // @ts-ignore
    console.error.mockClear();
  });
});
