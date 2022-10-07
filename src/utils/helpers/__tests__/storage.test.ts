import { storageHelpers } from '..';

describe('[Utils] Image', () => {
  const dummyData = 'value';

  it('LocalStroage에서 데이터가 잘 가져와지나요?', () => {
    localStorage.setItem('key', JSON.stringify(dummyData));
    const value = storageHelpers.getLocalStorage('key');

    expect(value).toBe(dummyData);
  });

  it('LocalStroage에 데이터 저장이 잘 되나요?', () => {
    storageHelpers.saveLocalStorage('key', dummyData);
    const value = storageHelpers.getLocalStorage('key');

    expect(value).toBe(dummyData);
  });

  it('LocalStroage에 데이터 제거가 잘 되나요?', () => {
    storageHelpers.saveLocalStorage('key', dummyData);
    storageHelpers.removeLocalStorage('key');
    const value = storageHelpers.getLocalStorage('key');

    expect(value).toBeNull();
  });

  it('SessionStorage에서 데이터가 잘 가져와지나요?', () => {
    sessionStorage.setItem('key', JSON.stringify(dummyData));
    const value = storageHelpers.getSessionStorage('key');

    expect(value).toBe(dummyData);
  });

  it('SessionStorage에 데이터 저장이 잘 되나요?', () => {
    storageHelpers.saveSessionStorage('key', dummyData);
    const value = storageHelpers.getSessionStorage('key');

    expect(value).toBe(dummyData);
  });

  it('SessionStorage에 데이터 제거가 잘 되나요?', () => {
    storageHelpers.saveSessionStorage('key', dummyData);
    storageHelpers.removeSessionStorage('key');
    const value = storageHelpers.getSessionStorage('key');

    expect(value).toBeNull();
  });
});
