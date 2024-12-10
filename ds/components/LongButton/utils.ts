import color from 'color';

import type { InternalTheme } from '../../types';
import type { FocusState } from '../../hooks/useFocusSystemHandlers';

type BaseProps = {
  theme: InternalTheme;
  disabled?: boolean;
  focusState: FocusState;
};

export const getButtonColors = ({ theme, focusState }: BaseProps) => {
  if (focusState === 'default') {
    return {
      backgroundColor: color(theme.colors.surfaceVariant)
        .alpha(0.4)
        .rgb()
        .toString(),
      textColor: theme.colors.inverseSurface,
      subTextColor: color(theme.colors.inverseSurface)
        .alpha(0.8)
        .rgb()
        .toString(),
    };
  }

  // focusState === 'focused' | 'pressed'
  return {
    backgroundColor: theme.colors.inverseSurface,
    textColor: theme.colors.inverseOnSurface,
    subTextColor: color(theme.colors.inverseOnSurface)
      .alpha(0.8)
      .rgb()
      .toString(),
  };
};
