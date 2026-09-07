import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';

import { Box, Text, useTheme } from '@/theme/primitives';

type Props = Omit<PressableProps, 'style'> & {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
};

export function Button({ label, variant = 'primary', loading, disabled, ...rest }: Props) {
  const theme = useTheme();
  const isDisabled = disabled || loading;
  const bg =
    variant === 'primary' ? 'accent' : variant === 'secondary' ? 'surfaceMuted' : 'surface';
  const fg = variant === 'primary' ? 'onAccent' : 'text';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled }}
      disabled={isDisabled}
      {...rest}
      style={({ pressed }) => ({ opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1 })}
    >
      <Box
        backgroundColor={bg}
        borderRadius="pill"
        paddingVertical="m"
        paddingHorizontal="l"
        alignItems="center"
        justifyContent="center"
        minHeight={52}
        borderWidth={variant === 'ghost' ? 1 : 0}
        borderColor="border"
      >
        {loading ? (
          <ActivityIndicator color={theme.colors[fg]} />
        ) : (
          <Text variant="button" color={fg}>
            {label}
          </Text>
        )}
      </Box>
    </Pressable>
  );
}
