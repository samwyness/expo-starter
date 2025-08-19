import * as Haptics from 'expo-haptics';
import type {
  GestureResponderEvent,
  PressableProps,
  ViewStyle,
} from 'react-native';
import { Pressable, View } from 'react-native';
import type { UnistylesVariants } from 'react-native-unistyles';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from './Text';

type ButtonVariants = UnistylesVariants<typeof styles>;

type ButtonProps = (PressableProps & ButtonVariants) & {
  title: string;
  block?: boolean;
  style?: ViewStyle;
  children?: never;
};

export function Button({
  title,
  variant = 'filled',
  block = false,
  ...props
}: ButtonProps) {
  styles.useVariants({ variant, block });

  const handlePress = async (e: GestureResponderEvent) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    props.onPress?.(e);
  };

  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      style={[styles.base, props.style]}
      onPress={handlePress}>
      {({ pressed }) => (
        <View style={styles.stateLayer({ pressed })}>
          <View style={styles.buttonInner}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  base: {
    height: 52,
    borderRadius: 9999,
    overflow: 'hidden',

    variants: {
      variant: {
        filled: {
          backgroundColor: theme.colors.primary,
        },
        tonal: {
          backgroundColor: theme.colors.primaryContainer,
        },
        errorFilled: {
          backgroundColor: theme.colors.error,
        },
        errorTonal: {
          backgroundColor: theme.colors.errorContainer,
        },
        outlined: {
          borderColor: theme.colors.outline,
          borderWidth: 2,
        },
      },
      block: {
        true: {
          width: '100%',
        },
      },
    },
  },

  stateLayer: ({ pressed }: { pressed: boolean }) => ({
    flex: 1,

    variants: {
      variant: {
        filled: {
          backgroundColor: pressed
            ? theme.rgbaColor('onPrimary', 10)
            : undefined,
        },
        tonal: {
          backgroundColor: pressed
            ? theme.rgbaColor('onPrimaryContainer', 10)
            : undefined,
        },
        errorFilled: {
          backgroundColor: pressed ? theme.rgbaColor('onError', 10) : undefined,
        },
        errorTonal: {
          backgroundColor: pressed
            ? theme.rgbaColor('onErrorContainer', 10)
            : undefined,
        },
        outlined: {
          backgroundColor: pressed
            ? theme.rgbaColor('onSurface', 10)
            : undefined,
        },
      },
    },
  }),

  buttonInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.space(6),
  },

  title: {
    fontWeight: theme.fontWeights.medium,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',

    variants: {
      variant: {
        filled: {
          color: theme.colors.onPrimary,
        },
        tonal: {
          color: theme.colors.onPrimaryContainer,
        },
        errorFilled: {
          color: theme.colors.onError,
        },
        errorTonal: {
          color: theme.colors.onErrorContainer,
        },
        outlined: {
          color: theme.colors.onSurface,
        },
      },
    },
  },
}));
