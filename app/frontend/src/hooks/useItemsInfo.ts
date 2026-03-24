import { getAllItem } from "@/api/items"
import { useQuery } from "@tanstack/react-query"

export function useItemsInfo(userId, listId) {
  const hasUserId = Boolean(userId?.trim())
  const hasListId = Boolean(listId?.trim())
  const { data, isLoading, isFetching, isError, error } = useQuery({
      queryKey: ['items', userId, listId],
      queryFn: () => getAllItem(listId),
      enabled: hasUserId && hasListId,
      staleTime: 1000*60*5,
    });
    
  

    return {
      itemData: data,
      isItemDataLoading: isLoading,
      isItemDataFetching: isFetching,
      isErrorItemData: isError,
      errorItemData: error

    }
}
