import { trpc } from './trpc';

export function useAuth() {
  const { data: user, isLoading } = trpc.auth.me.useQuery();
  return { user, isLoading };
}
