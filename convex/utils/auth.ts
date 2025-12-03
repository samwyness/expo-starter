import type { MutationCtx, QueryCtx } from '../_generated/server';

/**
 * Require the user to be authenticated, throwing an error if not.
 * @param ctx The query or mutation context.
 * @returns The authenticated user identity.
 */
export async function requireUserOrThrow(ctx: QueryCtx | MutationCtx) {
  const identity = await requireUser(ctx);
  if (!identity) {
    throw new Error('Not authenticated');
  }

  return identity;
}

/**
 * Get the authenticated user identity, or null if not authenticated.
 * @param ctx The query or mutation context.
 * @returns The authenticated user identity or null.
 */
export async function requireUser(ctx: QueryCtx | MutationCtx) {
  return await ctx.auth.getUserIdentity();
}
