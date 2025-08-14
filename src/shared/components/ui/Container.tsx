import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type ContainerProps = ViewProps;

export const Container = (props: ContainerProps) => {
  return <View {...props} style={[styles.container, props.style]} />;
};

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: theme.space(5),
  },
}));
