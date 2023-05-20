import { useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const useNavigateWithSearch = () => {
  const navigate = useNavigate();
  const [currentSearchParams] = useSearchParams();

  const navigateWithSearch = useCallback((to: string, customSearchParams?: URLSearchParams) => {
    navigate({
      pathname: to,
      search: (customSearchParams
        ? customSearchParams
        : currentSearchParams
      ).toString()
    });
  }, [navigate, currentSearchParams])

  return {
    navigateWithSearch,
  };
};