import { castingHelpers } from '..';

describe('[Utils] Casting', () => {
  it('Object 객체를 FormData 객체로 잘 변환하나요?', () => {
    const value = castingHelpers.createFormdata({ name: 'NB' });
    const expected = new FormData();
    expected.append('name', 'NB');

    expect(value).toEqual(expected);
  });
});
