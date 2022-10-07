import { imageHelpers } from '..';

describe('[Utils] Image', () => {
  it('File 객체으로부터 Object URL이 잘 반환되나요?', () => {
    const dummyFile1 = new File([''], 'Dummy1.file');
    const dummyFile2 = new File([''], 'Dummy2.file');

    const value1 = imageHelpers.getUriFromFile(dummyFile1);
    const value2 = imageHelpers.getUriFromFile([dummyFile1, dummyFile2]);

    expect(value1).toBe('Dummy1.file');
    expect(value2).toEqual(['Dummy1.file', 'Dummy2.file']);
  });

  it('BlobFile 객체으로부터 File 객체가 잘 반환되나요?', async () => {
    const blobFile: BlobFile = {
      objectURL: '테스트URL',
      name: '테스트파일',
      type: 'image/png',
    };

    const value1 = (await imageHelpers.getImageFileFromBlobFile(blobFile)) as File;
    const value2 = (await imageHelpers.getImageFileFromBlobFile([blobFile, blobFile])) as File[];

    expect(value1.name).toBe('테스트파일');
    expect(value2.map(file => file.name)).toEqual(['테스트파일', '테스트파일']);
  });
});
