// utils
import { FEED_IMAGE_URL, K_REIT_LOGO_IMAGE_URL } from './url';

/** GCP Storage 피드 버킷 반환 */
export const getFeedStorage = () => {
  if (!FEED_IMAGE_URL) {
    return { bucket: null, path: null };
  }

  return {
    bucket: process.env.NEXT_PUBLIC_ASSET_BUCKET,
    path: FEED_IMAGE_URL.replace(`${process.env.NEXT_PUBLIC_ASSET_DOMAIN}/`, ''),
  };
};

/** GCP Storage 리츠 로고 버킷 반환 */
export const getReitLogoStorage = () => {
  if (!K_REIT_LOGO_IMAGE_URL) {
    return { bucket: null, path: null };
  }

  return {
    bucket: process.env.NEXT_PUBLIC_ASSET_BUCKET,
    path: K_REIT_LOGO_IMAGE_URL.replace(`${process.env.VITE_PUBLIC_ASSET_DOMAIN}/`, ''),
  };
};
