import { useLocation, useNavigate } from 'react-router-dom';

export const useNavigateWithSearch = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  function navigateWithSearch(to: string) {
    navigate(to + search);
  }

  return {
    search,
    navigateWithSearch,
  };
};