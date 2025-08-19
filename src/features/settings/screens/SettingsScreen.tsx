import { useAuth } from '@clerk/clerk-expo';

import { BodyScrollView } from '#/shared/components/ui/BodyScrollView';
import { Button } from '#/shared/components/ui/Button';
import { Container } from '#/shared/components/ui/Container';
import { Text } from '#/shared/components/ui/Text';
import { useOnboardingStore } from '#/shared/stores/onboardingStore';
import { s } from '#/shared/theme/styles';

export function SettingsScreen() {
  const { signOut } = useAuth();
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);

  return (
    <BodyScrollView contentContainerStyle={s.flex_1}>
      <Container style={[s.flex_1, s.align_center, s.justify_center, s.gap_md]}>
        <Text weight="bold" size="titleLarge">
          Settings Screen
        </Text>

        <Button
          title="Reset onboarding"
          variant="errorTonal"
          onPress={resetOnboarding}
        />
        <Button
          title="Clear cache"
          variant="errorFilled"
          onPress={() => {
            signOut();
            resetOnboarding();
          }}
        />
      </Container>
    </BodyScrollView>
  );
}
