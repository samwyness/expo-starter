import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export const UsersTable = defineTable({
  /**
   * The unique identifier for the auth subject.
   */
  externalId: v.string(),
  /**
   * The user's email address.
   */
  email: v.string(),
  /**
   * The user's email verification status.
   */
  emailVerificationStatus: v.string(),
  /**
   * The unique handle for this profile.
   */
  handle: v.optional(v.string()),
  /**
   * The display name for this profile.
   */
  fullName: v.optional(v.string()),
  /**
   * The profile's avatar image URL.
   */
  avatarUrl: v.optional(v.string()),
  /**
   * The ID of the avatar image in Convex's storage (if any).
   */
  avatarId: v.optional(v.id('_storage')),
})
  .index('by_externalId', ['externalId'])
  .index('by_email', ['email']);
