import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { Button } from '#/shared/components/ui/Button';
import { Container } from '#/shared/components/ui/Container';
import { Text } from '#/shared/components/ui/Text';

export function HomeScreen() {
  const router = useRouter();

  const navigateToModal = () => {
    router.push('/modal');
  };

  return (
    <Container className="flex-1 items-center justify-center gap-5">
      <Text className="font-bold text-4xl text-primary">Home Screen</Text>
      <View className="gap-2">
        <Button label="Show Modal" onPress={navigateToModal} />
      </View>
    </Container>
  );
}
