import {
  createList,
  deleteList,
  updateList,
} from '@/api/lists';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function useLists() {
  const queryClient = useQueryClient();
  const createListMutation = useMutation({
    mutationFn: (listdata) => {
      return createList(listdata);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lists'],
      });
    },
  });
  const updateListMutation = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: any;
    }) => {
      return updateList(id, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lists'],
      });
    },
  });

  const deleteListMutation = useMutation({
    mutationFn: (id) => {
      return deleteList(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lists'],
      });
    },
  });
  return {
    updateListMutation,
    deleteListMutation,
    createListMutation,
  };
}
