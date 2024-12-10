import React, { useContext } from 'react';
import { DarkTheme, LightTheme } from './themes';
import type { DeepPartial, InternalTheme } from '../types';

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

const ThemeContext = React.createContext(themes.dark as InternalTheme);

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = 'dark';

  return (
    <ThemeContext.Provider value={themes[theme]}>
      {children}
    </ThemeContext.Provider>
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
  themeOverrides: DeepPartial<InternalTheme> | undefined
) => useTheme(themeOverrides) as InternalTheme;

export default ThemeProvider;
