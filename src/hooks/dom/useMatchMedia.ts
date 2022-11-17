import { useState, useLayoutEffect } from 'react';
// styles
import { mediaValue } from 'tds';

/**
 * 화면 크기에 따라서 특정 미디어 쿼리를 만족하는지 확인하는 Hook
 *
 * @example
 * const isTablet = useMatchMedia({ media: 'medium' });
 * const isDesktop = useMatchMedia({ media: 'large' });
 */
const useMatchMedia = ({ media }: Props) => {
  const [status, setStatus] = useState<Status>('idle');
  const [isMatch, setIsMatch] = useState(false);

  useLayoutEffect(() => {
    setIsMatch(window.innerWidth >= mediaValue[media]);
    setStatus('done');
  }, [media]);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia(`screen and (min-width: ${mediaValue[media]}px)`);
    const handleMediaQuery = (e: MediaQueryListEvent) => {
      setIsMatch(e.matches);
      setStatus('done');
    };

    mediaQuery.addEventListener('change', handleMediaQuery);
    return () => mediaQuery.removeEventListener('change', handleMediaQuery);
  }, [media]);

  return {
    status,
    isMatch,
  };
};

type Status = 'idle' | 'done';

type Mediavalue = typeof mediaValue;

type Props = {
  media: keyof Mediavalue;
};

export default useMatchMedia;
