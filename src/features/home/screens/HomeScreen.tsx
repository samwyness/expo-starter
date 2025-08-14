import { BodyScrollView } from '#/shared/components/ui/BodyScrollView';
import { Container } from '#/shared/components/ui/Container';
import { Text } from '#/shared/components/ui/Text';
import { s } from '#/shared/theme/styles';

export function HomeScreen() {
  return (
    <BodyScrollView contentContainerStyle={s.flex_1}>
      <Container style={[s.flex_1, s.align_center, s.justify_center, s.gap_md]}>
        <Text weight="bold" size="titleLarge">
          Home Screen
        </Text>
      </Container>
    </BodyScrollView>
  );
}
