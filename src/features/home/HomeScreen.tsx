import { Link } from 'expo-router';
import { View } from 'react-native';

import { Button } from '#/shared/components/ui/Button';
import { Container } from '#/shared/components/ui/Container';
import { Text } from '#/shared/components/ui/Text';

export function HomeScreen() {
  return (
    <Container className="flex-1 items-center justify-center gap-5">
      <Text className="font-bold text-4xl text-primary">Home Screen</Text>
      <View className="gap-2">
        <Link asChild push href="/modal">
          <Button label="Show Modal" />
        </Link>
      </View>
    </Container>
  );
}
