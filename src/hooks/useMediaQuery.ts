import { useState } from 'react';
import { useMediaQuery as useMedia } from 'react-responsive';

type MediaQueryProps = {
  maxWidth?: number;
  minWidth?: number;
};

export const useMediaQuery = (props: MediaQueryProps) => {
  const [isMounted] = useState(() => typeof window !== 'undefined');
  const isMaxWidth = useMedia(props);

  return isMounted && isMaxWidth;
};

useMediaQuery.displayName = 'useMediaQuery';
