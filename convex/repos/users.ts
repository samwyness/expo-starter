import type { WithoutSystemFields } from 'convex/server';

import { type MutationCtx, type QueryCtx } from '../_generated/server';
import type { Doc, Id } from '../types';

/**
 * Create a user with the given external ID. If a user with the
 * external ID already exists, return their existing ID.
 * @param ctx The mutation context.
 * @param params The parameters for creating the user.
 * @returns The ID of the newly created user.
 */
export async function createUser(
  ctx: MutationCtx,
  params: WithoutSystemFields<Doc<'users'>>,
): Promise<Id<'users'>> {
  const existing = await getUserByExternalId(ctx, params.externalId);
  if (existing) {
    return existing._id;
  }

  return ctx.db.insert('users', params);
}

/**
 * Get a user by their ID.
 * @param ctx The query context.
 * @param id The user's ID.
 * @returns The user document or null if not found.
 */
export async function getUserById(
  ctx: QueryCtx | MutationCtx,
  id: Id<'users'>,
): Promise<Doc<'users'> | null> {
  return ctx.db.get(id);
}

/**
 * Get a user by their external ID.
 * @param ctx The query or mutation context.
 * @param externalId The user's external ID.
 * @returns The user document or null if not found.
 */
export async function getUserByExternalId(
  ctx: QueryCtx | MutationCtx,
  externalId: string,
): Promise<Doc<'users'> | null> {
  return ctx.db
    .query('users')
    .withIndex('by_externalId', (q) => q.eq('externalId', externalId))
    .unique();
}

/**
 * Update a user by their ID.
 * @param ctx The mutation context.
 * @param id The user's ID.
 * @param data The data to update.
 * @returns A promise that resolves when the user is updated.
 */
export async function updateUser(
  ctx: MutationCtx,
  id: Id<'users'>,
  data: Partial<WithoutSystemFields<Doc<'users'>>>,
): Promise<void> {
  return ctx.db.patch(id, data);
}

/**
 * Delete a user by their ID.
 * @param ctx The mutation context.
 * @param id The user's ID.
 * @returns A promise that resolves when the user is deleted.
 */
export async function deleteUser(
  ctx: MutationCtx,
  id: Id<'users'>,
): Promise<void> {
  return ctx.db.delete(id);
}
