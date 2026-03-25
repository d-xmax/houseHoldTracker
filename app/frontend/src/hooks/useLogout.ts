import { logoutUser } from '@/api/login';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
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

      queryClient.removeQueries({
        queryKey: ['userInfo'],
      });
      queryClient.removeQueries({
        queryKey: ['lists'],
      });
      queryClient.removeQueries({
        queryKey: ['items'],
      });

      navigate('/login', { replace: true });
    },
  });

  return {
    logoutMutation,
  };
}
