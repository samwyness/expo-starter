import { StatusBar } from 'expo-status-bar';
import { Platform, Text } from 'react-native';

import { Container } from '#/shared/components/ui/Container';

export default function ModalScreen() {
  return (
    <Container>
      <Text>Modal</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Container>
  );
}
