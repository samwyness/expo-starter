import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { Container } from '#/shared/components/ui/Container';
import { Text } from '#/shared/components/ui/Text';

export default function ModalScreen() {
  return (
    <Container className="flex-1 items-center justify-center">
      <Text className="font-bold text-4xl text-primary">Modal Screen</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Container>
  );
}
