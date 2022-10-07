export {};

declare global {
  interface Window {
    /** Google Tag Manager 객체 */
    dataLayer: Record<string, any>[];
  }

  /** Blob 파일 타입 */
  export type BlobFile = {
    objectURL: string;
    name: string;
    type: string;
  };

  /** 국가 코드 */
  export type CountryCode = 'KR' | 'JP' | 'US' | 'SR';
}
