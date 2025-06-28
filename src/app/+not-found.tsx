import { Link, Stack } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '#/shared/components/ui/Container';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container>
        <Text>This screen doesn&apos;t exist.</Text>
        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </Container>
    </>
  );
}
