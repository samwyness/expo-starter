import { defineSchema } from 'convex/server';

import { UsersTable } from './schema/users';

export default defineSchema({
  users: UsersTable,
});
