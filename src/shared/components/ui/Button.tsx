import type { VariantProps } from 'cva';
import { cva } from 'cva';
import type { PressableProps } from 'react-native';
import { Pressable, View } from 'react-native';

import { Text } from './Text';

type ButtonVariants = VariantProps<typeof buttonStyles>;

type ButtonProps = (PressableProps & ButtonVariants) & {
  label: string;
  children?: never;
};

export function Button({ label, ...props }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      className={buttonStyles(props)}
      {...props}>
      {({ pressed }) => (
        <View className={buttonStateLayerStyles({ ...props, pressed })}>
          <Text className={buttonTextStyles(props)}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

const buttonStyles = cva({
  base: 'h-[52px] rounded-full overflow-hidden',
  variants: {
    variant: { filled: null, tonal: null, outline: null },
    disabled: { true: null, false: null },
  },
  compoundVariants: [
    {
      variant: 'filled',
      disabled: false,
      className: 'bg-primary',
    },
    {
      variant: 'tonal',
      disabled: false,
      className: 'bg-primaryContainer',
    },
    {
      variant: 'outline',
      disabled: false,
      className: 'border-2 border-primary',
    },
    {
      variant: ['filled', 'tonal', 'outline'],
      disabled: true,
      className: 'bg-outline',
    },
    {
      variant: 'outline',
      disabled: true,
      className: 'border-outline',
    },
  ],
  defaultVariants: {
    variant: 'filled',
    disabled: false,
  },
});

const buttonStateLayerStyles = cva({
  base: 'flex-1 flex-row justify-center items-center gap-2 px-8',
  variants: {
    variant: { filled: null, tonal: null, outline: null },
    pressed: { true: null, false: null },
  },
  compoundVariants: [
    {
      variant: 'filled',
      pressed: true,
      className: 'bg-onPrimary/10',
    },
    {
      variant: 'tonal',
      pressed: true,
      className: 'bg-onPrimaryContainer/10',
    },
    {
      variant: 'outline',
      pressed: true,
      className: 'bg-primary/10',
    },
  ],
  defaultVariants: {
    variant: 'filled',
  },
});

const buttonTextStyles = cva({
  base: 'text-md font-bold uppercase text-center',
  variants: {
    variant: {
      filled: 'text-onPrimary',
      tonal: 'text-onPrimaryContainer',
      outline: 'text-onSurface',
    },
    disabled: { true: null, false: null },
  },
  compoundVariants: [
    {
      variant: ['filled', 'tonal', 'outline'],
      disabled: true,
      className: 'text-outlineVariant',
    },
  ],
  defaultVariants: {
    variant: 'filled',
  },
});
