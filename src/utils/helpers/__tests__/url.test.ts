import { urlHelpers } from '..';

describe('[Utils] URL', () => {
  it('URL 파라미터를 잘 생성하나요?', () => {
    const dummyData = {
      skip: 10,
      limit: 10,
    };
    const value = urlHelpers.parameter(dummyData).toString();

    expect(value).toBe('skip=10&limit=10');
  });
});
