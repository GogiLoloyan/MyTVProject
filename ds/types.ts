import type * as React from 'react';

export type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

export type Font = {
  fontFamily: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  fontStyle?: 'normal' | 'italic' | undefined;
};

export type Fonts = {
  regular: Font;
  medium: Font;
  light: Font;
  thin: Font;
};

type Mode = 'adaptive' | 'exact';

export type Colors = {
  primary: string;
  primaryContainer: string;
  secondary: string;
  secondaryContainer: string;
  tertiary: string;
  tertiaryContainer: string;
  surface: string;
  surfaceVariant: string;
  surfaceDisabled: string;
  background: string;
  error: string;
  errorContainer: string;
  onPrimary: string;
  onPrimaryContainer: string;
  onSecondary: string;
  onSecondaryContainer: string;
  onTertiary: string;
  onTertiaryContainer: string;
  onSurface: string;
  onSurfaceVariant: string;
  onSurfaceDisabled: string;
  onError: string;
  onErrorContainer: string;
  onBackground: string;
  outline: string;
  outlineVariant: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  shadow: string;
  scrim: string;
  backdrop: string;
  elevation: ElevationColors;
};

export type AndroidColors = {
  primary: number;
  primaryContainer: number;
  secondary: number;
  secondaryContainer: number;
  tertiary: number;
  tertiaryContainer: number;
  surface: number;
  surfaceVariant: number;
  background: number;
  error: number;
  errorContainer: number;
  onPrimary: number;
  onPrimaryContainer: number;
  onSecondary: number;
  onSecondaryContainer: number;
  onTertiary: number;
  onTertiaryContainer: number;
  onSurface: number;
  onSurfaceVariant: number;
  onError: number;
  onErrorContainer: number;
  onBackground: number;
  outline: number;
  outlineVariant: number;
  inverseSurface: number;
  inverseOnSurface: number;
  inversePrimary: number;
  shadow: number;
  scrim: number;
};

export type Palette = {};

export type ThemeProp = DeepPartial<InternalTheme>;

export type ThemeBase = {
  dark: boolean;
  mode?: Mode;
  roundness: number;
  animation: {
    scale: number;
    defaultAnimationDuration?: number;
  };
};

export type Theme = ThemeBase & {
  version: 3;
  colors: Colors;
  fonts: Typescale;
};

export type InternalTheme = Theme;

export enum TypescaleKey {
  displayLarge = 'displayLarge',
  displayMedium = 'displayMedium',
  displaySmall = 'displaySmall',

  headlineLarge = 'headlineLarge',
  headlineMedium = 'headlineMedium',
  headlineSmall = 'headlineSmall',

  titleLarge = 'titleLarge',
  titleMedium = 'titleMedium',
  titleSmall = 'titleSmall',

  labelLarge = 'labelLarge',
  labelMedium = 'labelMedium',
  labelSmall = 'labelSmall',

  bodyLarge = 'bodyLarge',
  bodyMedium = 'bodyMedium',
  bodySmall = 'bodySmall',
}

export type Type = {
  fontFamily: string;
  letterSpacing: number;
  fontWeight: Font['fontWeight'];
  lineHeight: number;
  fontSize: number;
  fontStyle?: Font['fontStyle'];
};

export type Typescale =
  | {
      [key in TypescaleKey]: Type;
    } & {
      ['default']: Omit<Type, 'lineHeight' | 'fontSize'>;
    };

export type Elevation = 0 | 1 | 2 | 3 | 4 | 5;

export enum ElevationLevels {
  'level0',
  'level1',
  'level2',
  'level3',
  'level4',
  'level5',
}

export type ElevationColors = {
  [key in keyof typeof ElevationLevels]: string;
};

export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type $RemoveChildren<T extends React.ComponentType<any>> = $Omit<
  React.ComponentPropsWithoutRef<T>,
  'children'
>;

export type EllipsizeProp = 'head' | 'middle' | 'tail' | 'clip';

export type NavigationTheme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
};
