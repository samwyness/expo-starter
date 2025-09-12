import { useAuth } from '@clerk/clerk-expo';

import { useOnboardingActions } from '#/features/onboarding';
import { BodyScrollView } from '#/shared/components/BodyScrollView';
import { Button } from '#/shared/components/Button';
import { Container } from '#/shared/components/Container';
import { Text } from '#/shared/components/Text';
import { s } from '#/shared/theme/styles';

export function SettingsScreen() {
  const { signOut } = useAuth();
  const { resetOnboarding } = useOnboardingActions();

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
