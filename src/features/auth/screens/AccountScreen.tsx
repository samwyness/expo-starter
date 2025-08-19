import { useAuth, useUser } from '@clerk/clerk-expo';
import { useLocalCredentials } from '@clerk/clerk-expo/local-credentials';
import React from 'react';
import { TextInput } from 'react-native';

import { BodyScrollView } from '#/shared/components/ui/BodyScrollView';
import { Button } from '#/shared/components/ui/Button';
import { Container } from '#/shared/components/ui/Container';
import { Text } from '#/shared/components/ui/Text';
import { s } from '#/shared/theme/styles';

export function AccountScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { userOwnsCredentials, clearCredentials, setCredentials } =
    useLocalCredentials();

  const changePassword = React.useCallback(async () => {
    try {
      await user?.updatePassword({
        currentPassword: currentPassword,
        newPassword: password,
      });

      if (userOwnsCredentials) {
        await setCredentials({
          password,
        });
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [currentPassword, password, setCredentials, user, userOwnsCredentials]);

  return (
    <BodyScrollView contentContainerStyle={s.flex_1}>
      <Container style={[s.flex_1, s.align_center, s.justify_center, s.gap_md]}>
        <Text weight="bold" size="titleLarge">
          Account Screen
        </Text>

        <TextInput
          autoCapitalize="none"
          value={currentPassword}
          placeholder="Current password..."
          secureTextEntry={true}
          onChangeText={(currentPass) => setCurrentPassword(currentPass)}
        />
        <TextInput
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(pass) => setPassword(pass)}
        />
        <Button title="Update password" onPress={changePassword} />

        <Button
          title="Sign out"
          variant="errorTonal"
          onPress={() => signOut()}
        />
        {!!userOwnsCredentials && (
          <Button
            title="Remove biometric credentials"
            variant="errorTonal"
            onPress={() => clearCredentials()}
          />
        )}
      </Container>
    </BodyScrollView>
  );
}
