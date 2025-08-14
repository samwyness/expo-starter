import { View } from 'react-native';

import { Button } from '#/shared/components/ui/Button';
import { Container } from '#/shared/components/ui/Container';
import { Text } from '#/shared/components/ui/Text';
import { useOnboardingStore } from '#/shared/stores/onboardingStore';
import { s } from '#/shared/theme/styles';

export function OnboardingCompleteScreen() {
  const completeOnboarding = useOnboardingStore(
    (state) => state.completeOnboarding,
  );

  return (
    <View style={s.flex_1}>
      <Container style={[s.flex_1, s.align_center, s.justify_center, s.gap_md]}>
        <Text bold size="titleLarge">
          Onboarding Screen (2)
        </Text>
        <Button title="Continue" onPress={completeOnboarding} />
      </Container>
    </View>
  );
}
