import { useConvexMutation } from '@convex-dev/react-query';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { api } from '#/convex/_generated/api';

import { useCurrentUser } from './useCurrentUser';

/**
 * Custom hook to ensure the current authenticated user exists in the database.
 * If they do not exist, it calls the `ensureCurrentUser` mutation to create
 * them. This is useful for ensuring that user and profile documents exist
 * after authentication.
 */
export function useEnsureAuthUserExists() {
  const { isAuthenticated, isLoading, user: convexUser } = useCurrentUser();

  const ensureUserMutation = useMutation({
    mutationFn: useConvexMutation(api.v1.users.ensureCurrentUser),
    onError: (error) => {
      console.error('Error ensuring user in Convex:', error);
    },
  });

  // Ensure user exists in Convex
  React.useEffect(() => {
    // If still loading auth state or not authenticated, do nothing
    if (isLoading || !isAuthenticated) {
      return;
    }

    // If we already have a Convex user, don't do anything
    if (convexUser) {
      return;
    }

    // If a mutation is already in progress, do nothing
    if (ensureUserMutation.isPending) {
      return;
    }

    ensureUserMutation
      .mutateAsync({})
      .then(() => console.info('User created in Convex'))
      .catch((error) => console.error('Error ensuring user in Convex:', error));
  }, [convexUser, ensureUserMutation, isAuthenticated, isLoading]);
}
