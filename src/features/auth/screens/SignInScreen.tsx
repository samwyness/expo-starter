import { useSignIn } from '@clerk/clerk-expo';
import { useLocalCredentials } from '@clerk/clerk-expo/local-credentials';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '#/shared/components/ui/Button';
import { Container } from '#/shared/components/ui/Container';
import { Text } from '#/shared/components/ui/Text';
import { s } from '#/shared/theme/styles';

export function SignInScreen() {
  const router = useRouter();

  const { signIn, setActive, isLoaded } = useSignIn();
  const { hasCredentials, setCredentials, authenticate, biometricType } =
    useLocalCredentials();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Handle the submission of the sign-in form
  const onSignInPress = async (useLocal: boolean) => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt =
        hasCredentials && useLocal
          ? await authenticate()
          : await signIn.create({
              identifier: emailAddress,
              password,
            });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        console.log('status is complete?', signInAttempt.status);

        if (!useLocal) {
          await setCredentials({
            identifier: emailAddress,
            password,
          });
        }

        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status is not complete, check why. User may need to complete
        // further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // For info on error handing,
      // see https://clerk.com/docs/custom-flows/error-handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={[s.flex_1, styles.screen]}>
      <Container style={[s.flex_1, s.align_center, s.justify_center, s.gap_lg]}>
        <Text>Sign in</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(pass) => setPassword(pass)}
        />

        <Button title="Sign In" onPress={() => onSignInPress(false)} />

        {!!hasCredentials && !!biometricType && (
          <Button
            title={
              biometricType === 'face-recognition'
                ? 'Sign in with Face ID'
                : 'Sign in with Touch ID'
            }
            onPress={() => onSignInPress(true)}
          />
        )}

        <View style={styles.linkRow}>
          <Text>Don&apos;t have an account?</Text>
          <Link href="/create-account">
            <Text>Sign up</Text>
          </Link>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: {
    gap: theme.space(5),
  },
  linkRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
  },
}));
