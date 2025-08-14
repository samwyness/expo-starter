import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '#/shared/components/ui/Button';
import { Container } from '#/shared/components/ui/Container';
import { Text } from '#/shared/components/ui/Text';
import { useAuthStore } from '#/shared/stores/authStore';
import { s } from '#/shared/theme/styles';

export function SignInScreen() {
  const signIn = useAuthStore((state) => state.signIn);
  const signInAsVip = useAuthStore((state) => state.signInAsVip);

  return (
    <View style={[s.flex_1, styles.screen]}>
      <Container style={[s.flex_1, s.align_center, s.justify_center, s.gap_md]}>
        <Text weight="bold" size="titleLarge">
          Sign In Screen
        </Text>
        <Button title="Sign in" onPress={signIn} />
        <Button title="Sign in as VIP" onPress={signInAsVip} />
      </Container>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: {
    gap: theme.gap(5),
  },
}));
