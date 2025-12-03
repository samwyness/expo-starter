import { View } from 'react-native';

import { Button } from '#/shared/components/Button';
import { Container } from '#/shared/components/Container';
import { Text } from '#/shared/components/Text';
import { s } from '#/shared/theme/styles';

import { useOnboardingActions } from '../model/onboardingStore';

export function OnboardingCompleteScreen() {
  const { completeOnboarding } = useOnboardingActions();

  return (
    <View style={s.flex_1}>
      <Container style={[s.flex_1, s.align_center, s.justify_center, s.gap_md]}>
        <Text weight="bold" size="titleLarge">
          Onboarding Screen (2)
        </Text>
        <Button title="Continue" onPress={completeOnboarding} />
      </Container>
    </View>
  );
}
