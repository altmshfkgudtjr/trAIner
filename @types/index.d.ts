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

  type Select<T, K extends keyof T> = T[K];
}
