import { ConvexReactClient } from 'convex/react';

import { env } from '../config/env';

export const convexClient = new ConvexReactClient(env.CONVEX_URL, {
  unsavedChangesWarning: false,
});
