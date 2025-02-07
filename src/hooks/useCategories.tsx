import { useAppSelector } from '../redux/hooks';
import { useFetchCategoriesQuery } from '../redux/slices/Categories/categories.api';
import { useGuestUser } from './useGuestUser';

const useCategories = () => {
  const { isGuestUser } = useGuestUser();
  const userData = useAppSelector((state) => state.user.userInfo);
  const bearerToken = userData?.bearerToken as string;
  const {
    currentData, isError, isFetching, isSuccess,
  } = useFetchCategoriesQuery({ bearerToken }, { skip: !bearerToken && (isGuestUser ?? false) });

  return {
    currentData,
    isError,
    isFetching,
    isSuccess,
    isGuestUser,
  };
};

export { useCategories };
