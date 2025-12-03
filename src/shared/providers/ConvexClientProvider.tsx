import { useAuth } from '@clerk/clerk-expo';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import type { PropsWithChildren } from 'react';

import { convexClient } from '../lib/convex';

export default function ConvexClientProvider({ children }: PropsWithChildren) {
  return (
    // eslint-disable-next-line react-compiler/react-compiler
    <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
