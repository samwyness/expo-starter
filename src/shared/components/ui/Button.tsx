import type { PressableProps } from 'react-native';
import { Pressable, View } from 'react-native';

import { Text } from './Text';

type ButtonProps = PressableProps;

export function Button(props: ButtonProps) {
  return (
    <Pressable
      className="mt-4 bg-primary rounded-full overflow-hidden"
      {...props}>
      {({ pressed }) => (
        <View
          className={`flex-row items-center justify-center  p-4 ${pressed ? 'bg-onPrimary/10' : ''}`}>
          <Text className={`${pressed ? 'text-onPrimary' : 'text-onPrimary'}`}>
            Press Me
          </Text>
        </View>
      )}
    </Pressable>
  );
}
