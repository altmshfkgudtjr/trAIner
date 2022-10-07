/**
 * File 으로부터 Object URL을 얻는 함수
 * @param value 파일 또는 파일 리스트
 * @returns Object URL
 */
export const getUriFromFile = (value: File | File[]): string | string[] => {
  const list = Array.isArray(value) ? value : [value];
  const result = list.map(file => URL.createObjectURL(file));
  return result.length === 1 ? result[0] : result;
};

/**
 * ObjectURL 으로부터 File을 얻는 함수
 * @param imageUrlList 이미지 URL 리스트
 * @returns 이미지 파일 리스트
 */
export const getImageFileFromObjectURL = async (
  imageUrlList: string | string[],
): Promise<File | File[]> => {
  const SIGNATURE_NAME = 'SPI-IMAGE';

  const list = Array.isArray(imageUrlList) ? imageUrlList : [imageUrlList];
  const result = await Promise.all(
    list.map((imageURL, idx) => {
      return fetch(imageURL)
        .then(res => res.blob())
        .then(blob => {
          return new File([blob], `${SIGNATURE_NAME}-${idx}.png`, {
            lastModified: new Date().getTime(),
            type: 'image/png',
          });
        });
    }),
  );

  return result.length === 1 ? result[0] : result;
};

/**
 * BlobFile 으로부터 File을 얻는 함수
 * @param blobFileList BlobFile
 * @returns 파일 리스트
 */
export const getImageFileFromBlobFile = async (
  blobFileList: BlobFile | BlobFile[],
): Promise<File | File[]> => {
  const list = Array.isArray(blobFileList) ? blobFileList : [blobFileList];
  const result = await Promise.all(
    list.map(blobFile => {
      return fetch(blobFile.objectURL)
        .then(res => res.blob())
        .then(blob => {
          return new File([blob], blobFile.name, {
            lastModified: new Date().getTime(),
            type: blobFile.type,
          });
        });
    }),
  );

  return result.length === 1 ? result[0] : result;
};
