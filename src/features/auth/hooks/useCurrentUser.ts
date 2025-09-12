import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import { useConvexAuth } from 'convex/react';

import { api } from '#/convex/_generated/api';

/**
 * Get the current user data and status.
 * Uses Convex's authentication and query hooks which are linked to Clerk.
 *
 * If Clerk authentication exists but the Convex user document hasn't been created yet,
 * `isAuthenticated` will be `false` and `user`/`profile` will be `null`.
 */
export function useCurrentUser() {
  const { isAuthenticated, isLoading: isLoadingAuth } = useConvexAuth();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    ...convexQuery(api.v1.users.current, {}),
    enabled: isAuthenticated,
  });

  return {
    user,
    isAuthenticated,
    isLoading: isLoadingAuth || isLoadingUser,
  };
}
