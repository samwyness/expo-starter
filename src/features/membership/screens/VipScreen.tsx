import { BodyScrollView } from '#/shared/components/BodyScrollView';
import { Container } from '#/shared/components/Container';
import { Text } from '#/shared/components/Text';
import { s } from '#/shared/theme/styles';

export function VipScreen() {
  return (
    <BodyScrollView contentContainerStyle={s.flex_1}>
      <Container style={[s.flex_1, s.align_center, s.justify_center, s.gap_sm]}>
        <Text weight="bold" size="titleLarge">
          VIP Screen
        </Text>
      </Container>
    </BodyScrollView>
  );
}
