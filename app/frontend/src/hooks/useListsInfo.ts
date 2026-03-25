import { getLists } from '@/api/lists';
import { useQuery } from '@tanstack/react-query';

export function useListsInfo(userId?: string) {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['lists', userId],
    queryFn: getLists,
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(userId),
  });

  return {
    listData: data,
    isLoadingListData: isLoading,
    isFetchingListData: isFetching,
    isErrorListData: isError,
    errorListData: error,
  };
}
