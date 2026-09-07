import {
  createBox,
  createRestyleComponent,
  createText,
  createVariant,
  useTheme as useRestyleTheme,
  type VariantProps,
} from '@shopify/restyle';
import type { ComponentProps } from 'react';
import { Pressable as RNPressable, type PressableProps as RNPressableProps } from 'react-native';

import type { Theme } from './theme';

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export const Pressable = createBox<Theme, RNPressableProps>(RNPressable);

type CardProps = VariantProps<Theme, 'cardVariants'> & ComponentProps<typeof Box>;
export const Card = createRestyleComponent<CardProps, Theme>(
  [createVariant({ themeKey: 'cardVariants' })],
  Box,
);

export const useTheme = () => useRestyleTheme<Theme>();
