import { useSearchParams, useNavigate } from 'react-router-dom';

export const useNavigateWithSearch = () => {
  const [currentSearchParams] = useSearchParams();
  const navigate = useNavigate();

  function navigateWithSearch(to: string, customSearchParams?: URLSearchParams) {
    navigate({
      pathname: to,
      search: (customSearchParams
        ? customSearchParams
        : currentSearchParams
      ).toString()
    });
  }

  return {
    navigateWithSearch,
  };
};