import { useAuth, useUser } from '@clerk/clerk-expo';
import { useLocalCredentials } from '@clerk/clerk-expo/local-credentials';
import React from 'react';
import { Image, TextInput } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { BodyScrollView } from '#/shared/components/BodyScrollView';
import { Button } from '#/shared/components/Button';
import { Container } from '#/shared/components/Container';
import { Text } from '#/shared/components/Text';
import { s } from '#/shared/theme/styles';

import { useCurrentUser } from '../hooks/useCurrentUser';

export function AccountScreen() {
  const { signOut } = useAuth();
  const { user: clerkUser } = useUser();
  const { user } = useCurrentUser();

  const avatarParams = new URLSearchParams();
  avatarParams.set('width', '800');
  avatarParams.set('height', '800');
  avatarParams.set('quality', '100');

  const avatarUrl = `${user?.avatarUrl}?${avatarParams.toString()}`;

  const [currentPassword, setCurrentPassword] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { userOwnsCredentials, clearCredentials, setCredentials } =
    useLocalCredentials();

  const changePassword = React.useCallback(async () => {
    try {
      await clerkUser?.updatePassword({
        currentPassword: currentPassword,
        newPassword: password,
      });

      if (userOwnsCredentials) {
        await setCredentials({
          password,
        });
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [
    clerkUser,
    currentPassword,
    password,
    setCredentials,
    userOwnsCredentials,
  ]);

  return (
    <BodyScrollView contentContainerStyle={s.flex_1}>
      <Container style={[s.flex_1, s.align_center, s.justify_center, s.gap_md]}>
        {!!avatarUrl && (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        )}
        {!!user?.fullName && (
          <Text weight="bold" size="titleLarge">
            {user.fullName}
          </Text>
        )}
        {!!user?.handle && <Text size="titleSmall">@{user.handle}</Text>}

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

const styles = StyleSheet.create(() => ({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
}));
