import { getLists } from '@/api/lists';
import { useQuery } from '@tanstack/react-query';

export function useLists() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['lists'],
    queryFn: getLists,
    staleTime: 1000 * 60 * 5, 
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error
  };
}
