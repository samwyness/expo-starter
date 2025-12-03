import IconAccount from '@material-symbols/svg-400/rounded/account_circle.svg';
import IconAccountFill from '@material-symbols/svg-400/rounded/account_circle-fill.svg';
import IconCrown from '@material-symbols/svg-400/rounded/crown.svg';
import IconCrownFill from '@material-symbols/svg-400/rounded/crown-fill.svg';
import IconHome from '@material-symbols/svg-400/rounded/home.svg';
import IconHomeFill from '@material-symbols/svg-400/rounded/home-fill.svg';
import IconSettings from '@material-symbols/svg-400/rounded/instant_mix.svg';
import IconSettingsFill from '@material-symbols/svg-400/rounded/instant_mix-fill.svg';
import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';

import { AppIcon } from '#/shared/components/AppIcon';

export default function TabsLayout() {
  const isVip = true; // Replace with actual logic to determine if the user is a VIP

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: HomeIcon }}
      />
      <Tabs.Protected guard={isVip}>
        <Tabs.Screen
          name="vip"
          options={{ title: 'VIP', tabBarIcon: VipIcon }}
        />
      </Tabs.Protected>
      <Tabs.Screen
        name="settings"
        options={{ title: 'Settings', tabBarIcon: SettingsIcon }}
      />
      <Tabs.Screen
        name="account"
        options={{ title: 'Account', tabBarIcon: AccountIcon }}
      />
    </Tabs>
  );
}

type TabBarIconProps = {
  focused: boolean;
  color: ColorValue;
  size: number;
};

const HomeIcon = ({ focused, color, size }: TabBarIconProps) => (
  <AppIcon icon={focused ? IconHomeFill : IconHome} size={size} fill={color} />
);
const VipIcon = ({ focused, color, size }: TabBarIconProps) => (
  <AppIcon
    icon={focused ? IconCrownFill : IconCrown}
    size={size}
    fill={color}
  />
);
const SettingsIcon = ({ focused, color, size }: TabBarIconProps) => (
  <AppIcon
    icon={focused ? IconSettingsFill : IconSettings}
    size={size}
    fill={color}
  />
);
const AccountIcon = ({ focused, color, size }: TabBarIconProps) => (
  <AppIcon
    icon={focused ? IconAccountFill : IconAccount}
    size={size}
    fill={color}
  />
);
