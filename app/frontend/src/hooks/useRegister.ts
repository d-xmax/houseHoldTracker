import { registerUser } from '@/api/register';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type Register = {
  name: string;
  email: string;
  password: string;
};

export function useRegister() {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: (data: Register) => registerUser(data),
    onSuccess: (_, variables) => {
      navigate('/login', {
        replace: true,
        state: {
          registered: true,
          email: variables.email,
        },
      });
    },
  });

  return { registerMutation };
}
