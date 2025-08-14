import { Link } from 'expo-router';
import { View } from 'react-native';

import { Button } from '#/shared/components/ui/Button';
import { Container } from '#/shared/components/ui/Container';
import { Text } from '#/shared/components/ui/Text';
import { s } from '#/shared/theme/styles';

export function OnboardingScreen() {
  return (
    <View style={s.flex_1}>
      <Container style={[s.flex_1, s.align_center, s.justify_center, s.gap_md]}>
        <Text bold size="titleLarge">
          Onboarding Screen
        </Text>
        <Link asChild push href="/onboarding/complete">
          <Button title="Continue" />
        </Link>
      </Container>
    </View>
  );
}
