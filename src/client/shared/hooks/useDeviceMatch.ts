import { SMALL_BREAKPOINT } from '@/app/constants/breakpoints.constants';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

export function useDeviceMatch() {
  return {
    isMobile: useMediaQuery(`(max-width: ${SMALL_BREAKPOINT})`)
  }
}