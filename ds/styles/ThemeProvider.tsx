import React, { ComponentType, useContext } from 'react';
import { DarkTheme, LightTheme } from './themes';
import type { DeepPartial, InternalTheme } from '../types';

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

const ThemeContext = React.createContext(themes.dark as InternalTheme);

let __internalTheme: InternalTheme;

const ThemeProvider: React.FC<
  React.PropsWithChildren<{ theme?: InternalTheme }>
> = ({ children, theme: themeOverrides }) => {
  const theme = themeOverrides ?? themes['dark'];
  __internalTheme = theme;

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export function useTheme(themeOverrides?: DeepPartial<InternalTheme>) {
  const theme = useContext(ThemeContext);
  if (themeOverrides) {
    return themeOverrides;
  }
  return theme;
}

export const useInternalTheme = (
  themeOverrides?: DeepPartial<InternalTheme> | undefined
) => useTheme(themeOverrides) as InternalTheme;

export const withInternalTheme =
  <Props extends { theme: InternalTheme }, C>(
    WrappedComponent: ComponentType<Props & { theme: InternalTheme }> & C
  ) =>
  (props: any) =>
    <WrappedComponent {...props} theme={__internalTheme} />;

export default ThemeProvider;
