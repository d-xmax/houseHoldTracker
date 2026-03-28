import { useUserInfo } from '@/hooks/useUserInfo';
import type React from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingState } from '@/shared/components/LoadingState';
type childrenType = {
  children: React.ReactNode;
};
export default function ProtectedRoute({
  children,
}: childrenType) {
  const { data, isError, isLoading, isFetching } =
    useUserInfo();
  // log removed
  if (isLoading) {
    return <LoadingState
        variant="page"
        title="Loading"
        description="Please wait"
      />;
  }
  // if (isFetching) {
  //   return <LoadingState title="Fetching" description="Please wait while we fetch your information." />;
  // }

  if (!data || isError) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
