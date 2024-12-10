import color from 'color';

import type { InternalTheme } from '../../types';
import { FocusState } from '../../hooks/useFocusSystemHandlers';

type BaseProps = {
  theme: InternalTheme;
  disabled?: boolean;
  focusState: FocusState;
};

export const getButtonColors = ({ theme, focusState }: BaseProps) => {
  if (focusState === 'default') {
    return {
      linearGradient: ['rgba(29, 29, 30, 1)', 'rgba(29, 29, 30, 0)'],
      scrimColor: color(theme.colors.surfaceVariant)
        .alpha(0.2)
        .rgb()
        .toString(),
      borderColor: 'transparent',
      backgroundColor: theme.colors.inverseOnSurface,
      textColor: theme.colors.onSurface,
      subTextColor: color(theme.colors.onSurface).alpha(0.8).rgb().toString(),
    };
  }

  // focusState === 'focused' | 'pressed'
  return {
    linearGradient: ['rgba(19, 19, 20, 1)', 'rgba(19, 19, 20, 0)'],
    scrimColor: color(theme.colors.surface).alpha(0.2).rgb().toString(),
    borderColor: color(theme.colors.onSurface).alpha(0.2).rgb().toString(),
    backgroundColor: undefined,
    textColor: theme.colors.onSurface,
    subTextColor: color(theme.colors.onSurface).alpha(0.8).rgb().toString(),
  };
};
