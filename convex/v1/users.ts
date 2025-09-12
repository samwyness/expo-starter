import type { UserJSON } from '@clerk/backend';
import type { WithoutSystemFields } from 'convex/server';
import type { Validator } from 'convex/values';
import { v } from 'convex/values';

import { internalMutation, query } from '../_generated/server';
import {
  createUser,
  deleteUser,
  getUserByExternalId,
  updateUser,
} from '../repos/users';
import type { Doc } from '../types';
import { requireUserOrThrow } from '../utils/auth';

/**
 * Get the current user.
 * @return The user document or null if not found
 */
export const current = query(async (ctx) => {
  const { subject } = await requireUserOrThrow(ctx);
  const user = await getUserByExternalId(ctx, subject);
  if (!user) {
    return null;
  }

  return user;
});

/**
 * Upsert a user from Clerk's webhook data.
 * If the user does not already exist, create a new user.
 * @param data The user data from Clerk's webhook
 */
export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
  async handler(ctx, { data }) {
    const primaryEmail =
      data.email_addresses.find(
        (e) => e.id === data.primary_email_address_id,
      ) ?? data.email_addresses[0];

    // Must have at least one email address
    if (!primaryEmail) {
      throw new Error(
        `User with id ${data.id} has no email addresses, cannot create user.`,
      );
    }

    const fullName = [data.first_name, data.last_name]
      .filter(Boolean)
      .join(' ')
      .trim();

    const userAttributes: WithoutSystemFields<Doc<'users'>> = {
      externalId: data.id,
      email: primaryEmail.email_address,
      emailVerificationStatus: primaryEmail.verification?.status ?? 'unknown',
      fullName: fullName ?? undefined,
      avatarUrl: data.image_url ?? undefined,
    };

    const user = await getUserByExternalId(ctx, data.id);
    if (user === null) {
      await createUser(ctx, userAttributes);
    } else {
      await updateUser(ctx, user._id, userAttributes);
    }
  },
});

/**
 * Deletes a user from Clerk's webhook data.
 * @param externalId The external ID of the user from Clerk's webhook
 */
export const deleteFromClerk = internalMutation({
  args: { externalId: v.string() },
  async handler(ctx, { externalId }) {
    // Ensure user exists
    const user = await getUserByExternalId(ctx, externalId);
    if (user === null) {
      throw new Error(
        `Tried to delete user with externalId ${externalId}, but no such user exists.`,
      );
    }

    await deleteUser(ctx, user._id);
  },
});
