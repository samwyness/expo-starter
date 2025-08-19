import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import * as React from 'react';
import { TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '#/shared/components/ui/Button';
import { Container } from '#/shared/components/ui/Container';
import { Text } from '#/shared/components/ui/Text';
import { s } from '#/shared/theme/styles';

export function CreateAccountScreen() {
  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.screen}>
        <Container
          style={[s.flex_1, s.align_center, s.justify_center, s.gap_lg]}>
          <Text>Verify your email</Text>
          <TextInput
            value={code}
            placeholder="Enter your verification code"
            onChangeText={(newCode) => setCode(newCode)}
          />
          <Button title="Verify" onPress={onVerifyPress} />
        </Container>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Container style={[s.flex_1, s.align_center, s.justify_center, s.gap_lg]}>
        <Text>Sign up</Text>
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

        <Button title="Continue" onPress={onSignUpPress} />

        <View style={styles.linkRow}>
          <Text>Already have an account?</Text>
          <Link href="/sign-in">
            <Text>Sign in</Text>
          </Link>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.space(1),
  },
  linkRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
  },
}));
