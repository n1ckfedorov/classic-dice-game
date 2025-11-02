import { useState } from 'react';
import { useMediaQuery as useMedia } from 'react-responsive';

export const useMediaQuery = (props: any) => {
  const [isMounted] = useState(() => typeof window !== 'undefined');
  const isMaxWidth = useMedia(props);

  return isMounted && isMaxWidth;
};

useMediaQuery.displayName = 'useMediaQuery';
