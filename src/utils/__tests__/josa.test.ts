import { getJosa } from '../josa';

describe('[Utils] 한국어 조사', () => {
  it('조사만 반환하나요?', () => {
    const value = getJosa('강아지', '은/는', false);

    expect(value).toBe('는');
  });

  it('조사와 함께 반환하나요?', () => {
    const value = getJosa('강아지', '은/는', true);
    const defaultOptionValue = getJosa('강아지', '은/는');

    expect(value).toBe('강아지는');
    expect(defaultOptionValue).toBe('강아지는');
  });
});
