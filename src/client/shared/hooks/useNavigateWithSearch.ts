import { useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { NavigateOptions, Path } from 'react-router-dom';

export const useNavigateWithSearch = () => {
  const navigate = useNavigate();
  const [currentSearchParams] = useSearchParams();

  const navigateWithSearch = useCallback((
    to: string | Partial<Path>,
    options?: NavigateOptions
  ) => {
    const { pathname, search } = (to as Partial<Path>) || {};

    navigate({
      pathname: pathname
        ? pathname
        : to as string,
      search: (typeof search === 'string')
        ? search
        : currentSearchParams.toString()
    }, options);
  }, [navigate, currentSearchParams])

  return {
    navigateWithSearch,
  };
};