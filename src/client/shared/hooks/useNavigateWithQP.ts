import { useLocation, useNavigate } from 'react-router-dom';

const useNavigateWithQP = () => {
  const { search: queryParams } = useLocation();
  const navigate = useNavigate();

  function navigateWithQP(to: string) {
    navigate(to + queryParams);
  }

  return {
    navigateWithQP,
    queryParams,
  };
};

export default useNavigateWithQP;