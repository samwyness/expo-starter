import { Tabs } from 'expo-router';

import { useAuthStore } from '#/shared/stores/authStore';

export default function TabsLayout() {
  const isVip = useAuthStore((state) => state.isVip);

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Protected guard={isVip}>
        <Tabs.Screen name="vip" options={{ title: 'VIP' }} />
      </Tabs.Protected>
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
