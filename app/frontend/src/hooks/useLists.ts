import {
  createList,
  deleteList,
  updateList,
} from '@/api/lists';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

type ListPayload = {
  name: string;
  description: string;
  color: string;
};

type UpdateListPayload = {
  id: string;
  updatedData: Record<string, unknown>;
};

export function useLists(userId?: string) {
  const queryClient = useQueryClient();
  const createListMutation = useMutation({
    mutationFn: (listData: ListPayload) => {
      return createList(listData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lists', userId],
      });
    },
  });
  const updateListMutation = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: UpdateListPayload) => {
      return updateList(id, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lists', userId],
      });
    },
  });

  const deleteListMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteList(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lists', userId],
      });
    },
  });
  return {
    updateListMutation,
    deleteListMutation,
    createListMutation,
  };
}
