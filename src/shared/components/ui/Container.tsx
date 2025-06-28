import type { PropsWithChildren } from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';

type ContainerProps = PropsWithChildren<ViewProps>;

export const Container = (props: ContainerProps) => {
  return <View {...props} />;
};
