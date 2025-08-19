import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import type { PropsWithChildren } from 'react';

import { env } from '#/shared/config/env';

export default function AuthProvider({ children }: PropsWithChildren) {
  return (
    <ClerkProvider
      publishableKey={env.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}>
      <ClerkLoaded>{children}</ClerkLoaded>
    </ClerkProvider>
  );
}
