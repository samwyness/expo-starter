import { Text } from 'react-native';

import { Container } from '#/shared/components/ui/Container';

export function HomeScreen() {
  return (
    <Container className="flex-1 items-center justify-center">
      <Text className="font-bold text-4xl text-primary">Home Screen</Text>
    </Container>
  );
}
