import { useMediaQuery } from '@mui/material';

export default function useCheckScreen() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isDesktop = useMediaQuery('(min-width: 601px');

  return {
    isMobile,
    isDesktop,
  };
}
