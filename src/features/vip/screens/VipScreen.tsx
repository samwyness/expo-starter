import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { BodyScrollView } from '#/shared/components/ui/BodyScrollView';
import { Container } from '#/shared/components/ui/Container';
import { Text } from '#/shared/components/ui/Text';
import { s } from '#/shared/theme/styles';

export function VipScreen() {
  return (
    <BodyScrollView contentContainerStyle={s.flex_1}>
      <Container style={[s.flex_1, s.align_center, s.justify_center, s.gap_sm]}>
        <Text weight="bold" size="titleLarge">
          VIP Screen
        </Text>
        <TextInput placeholder="What's up?" style={styles.input} />
      </Container>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  input: {
    width: '100%',
    textAlign: 'center',
    color: theme.colors.onSurface,
    fontSize: theme.fontSize.bodyLarge,
  },
}));
