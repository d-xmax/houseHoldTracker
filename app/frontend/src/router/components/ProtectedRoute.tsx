import { useUserInfo } from '@/hooks/useUserInfo';
import type React from 'react';
import { Navigate } from 'react-router-dom';

type childrenType = {
  children: React.ReactNode;
};
export default function ProtectedRoute({
  children,
}: childrenType) {
  const { data, isError, isLoading, isFetching } =
    useUserInfo();
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isFetching) {
    return <div>fetching...</div>;
  }

  if (!data || isError) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
