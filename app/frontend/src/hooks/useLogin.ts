import { loginUser } from '@/api/login';
import {
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
type dataType = {
  email: string;
  password: string;
};

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // login mutation + call get user
  const loginMutation = useMutation({
    mutationFn: (data: dataType) =>
      loginUser(data),
    onMutate: async () => {
      sessionStorage.removeItem('accessToken');

      await queryClient.cancelQueries({
        queryKey: ['userInfo'],
      });
      await queryClient.cancelQueries({
        queryKey: ['lists'],
      });
      await queryClient.cancelQueries({
        queryKey: ['items'],
      });

      queryClient.setQueryData(
        ['userInfo'],
        null,
      );
      queryClient.removeQueries({
        queryKey: ['lists'],
      });
      queryClient.removeQueries({
        queryKey: ['items'],
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['userInfo'],
      });
      navigate('/grocery-pilot');
    },
    onError: (error) => console.log(error),
  });

  return {
    loginMutation,
  };
}
