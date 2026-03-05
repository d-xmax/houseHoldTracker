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
      await queryClient.cancelQueries({
        queryKey: ['userInfo'],
      });
      queryClient.setQueryData(
        ['userInfo'],
        null,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['userInfo'],
      });
      navigate('/grocery-planner');
    },
    onError: (error) => console.log(error),
  });

  return {
    loginMutation,
  };
}
