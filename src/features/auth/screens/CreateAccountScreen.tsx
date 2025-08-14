import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Container } from '#/shared/components/ui/Container';
import { Text } from '#/shared/components/ui/Text';
import { s } from '#/shared/theme/styles';

export function CreateAccountScreen() {
  return (
    <View style={styles.screen}>
      <Container style={[s.flex_1, s.align_center, s.justify_center]}>
        <Text weight="bold" size="titleLarge">
          Create Account Screen
        </Text>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.space(1),
  },
}));
