import { useFocusEffect } from 'expo-router';

import { tryAsync } from '#/lib/result';
import { BodyScrollView } from '#/shared/components/ui/BodyScrollView';
import { Button } from '#/shared/components/ui/Button';
import { Container } from '#/shared/components/ui/Container';
import { Text } from '#/shared/components/ui/Text';
import { useAuthStore } from '#/shared/stores/authStore';
import { useOnboardingStore } from '#/shared/stores/onboardingStore';
import { s } from '#/shared/theme/styles';

const getData = async () => {
  const value = Math.random();
  if (value < 0.5) {
    return Promise.reject(new Error('Failed to fetch data'));
  }
  return Promise.resolve('Data fetched successfully');
};

export function SettingsScreen() {
  const signOut = useAuthStore((state) => state.signOut);
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);

  // Example of using tryAsync for error handling
  useFocusEffect(() => {
    const fetchData = async () => {
      const [data, error] = await tryAsync(getData());
      if (error) {
        console.error('Error fetching data:', error);
        return;
      }
      console.log('Fetched data:', data);
    };

    fetchData();
  });

  return (
    <BodyScrollView contentContainerStyle={s.flex_1}>
      <Container style={[s.flex_1, s.align_center, s.justify_center, s.gap_md]}>
        <Text weight="bold" size="titleLarge">
          Settings Screen
        </Text>

        <Button title="Sign out" onPress={signOut} />
        <Button
          title="Reset onboarding"
          variant="errorTonal"
          onPress={resetOnboarding}
        />
        <Button
          title="Clear cache"
          variant="errorFilled"
          onPress={() => {
            signOut();
            resetOnboarding();
          }}
        />
      </Container>
    </BodyScrollView>
  );
}
