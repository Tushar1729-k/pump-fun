import { createTheme } from '@shopify/restyle';

// Palette. Red is the accent, a nod to the reference app; everything else stays neutral.
const palette = {
  red: '#D7263D',
  redSoft: '#FBE3E7',
  redSoftDark: '#3A1218',
  green: '#1F9D55',
  greenSoft: '#E1F5EA',
  greenSoftDark: '#12301F',
  amber: '#C98A00',

  white: '#FFFFFF',
  gray50: '#F6F6F7',
  gray100: '#ECEDEF',
  gray200: '#DADCE0',
  gray400: '#9A9EA6',
  gray600: '#5E636B',
  gray800: '#2A2D33',
  gray900: '#17191D',
  black: '#0B0C0E',
};

export const lightTheme = createTheme({
  colors: {
    background: palette.gray50,
    surface: palette.white,
    surfaceMuted: palette.gray100,
    border: palette.gray200,
    text: palette.gray900,
    textMuted: palette.gray600,
    textFaint: palette.gray400,
    accent: palette.red,
    accentSoft: palette.redSoft,
    onAccent: palette.white,
    success: palette.green,
    successSoft: palette.greenSoft,
    warning: palette.amber,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadii: {
    s: 6,
    m: 12,
    l: 20,
    pill: 999,
  },
  textVariants: {
    defaults: {
      color: 'text',
      fontSize: 16,
      lineHeight: 22,
    },
    display: {
      fontSize: 34,
      lineHeight: 40,
      fontWeight: '700',
      letterSpacing: -0.5,
    },
    title: {
      fontSize: 24,
      lineHeight: 30,
      fontWeight: '700',
    },
    heading: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: '600',
    },
    body: {
      fontSize: 16,
      lineHeight: 22,
    },
    caption: {
      fontSize: 13,
      lineHeight: 18,
      color: 'textMuted',
    },
    label: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '600',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      color: 'textMuted',
    },
    button: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600',
      color: 'onAccent',
    },
  },
  cardVariants: {
    defaults: {
      backgroundColor: 'surface',
      borderRadius: 'm',
      padding: 'm',
      borderWidth: 1,
      borderColor: 'border',
    },
    muted: {
      backgroundColor: 'surfaceMuted',
      borderColor: 'surfaceMuted',
    },
    accent: {
      backgroundColor: 'accentSoft',
      borderColor: 'accentSoft',
    },
  },
});

export type Theme = typeof lightTheme;

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: palette.black,
    surface: palette.gray900,
    surfaceMuted: palette.gray800,
    border: palette.gray800,
    text: palette.gray50,
    textMuted: palette.gray400,
    textFaint: palette.gray600,
    accentSoft: palette.redSoftDark,
    successSoft: palette.greenSoftDark,
  },
};
