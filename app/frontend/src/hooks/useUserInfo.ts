import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/api/login';
type UserInfo = {
  _id: string;
  name: string;
  email: string;
}
type useUserInfoType = {
  data : UserInfo | null;
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
  error: unknown;

}
export function useUserInfo()  {
  // cache data
  const {
    data,
    isFetching,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUser,
    retry: false,
    staleTime: 1000*60*5,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
   
  return {
    data,
    isFetching,
    isLoading,
    isError,
    error,
  };
}
