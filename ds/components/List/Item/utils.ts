import color from 'color';

import type { InternalTheme } from '../../../types';
import type { FocusState } from '../../../hooks/useFocusSystemHandlers';

type BaseProps = {
  theme: InternalTheme;
  disabled?: boolean;
  focusState: FocusState;
  selected: boolean;
};

export const getColors = ({
  theme,
  disabled,
  focusState,
  selected,
}: BaseProps) => {
  if (disabled) {
    return {
      textColor: color(theme.colors.onSurface).alpha(0.4).rgb().toString(),
      subTextColor: color(theme.colors.onSurface).alpha(0.4).rgb().toString(),
      overlineTextColor: color(theme.colors.onSurface)
        .alpha(0.4)
        .rgb()
        .toString(),
    };
  }
  if (focusState === 'default') {
    if (selected) {
      return {
        backgroundColor: color(theme.colors.secondaryContainer)
          .alpha(0.4)
          .rgb()
          .toString(),
        textColor: theme.colors.onSecondaryContainer,
        subTextColor: color(theme.colors.onSecondaryContainer)
          .alpha(0.8)
          .rgb()
          .toString(),
        overlineTextColor: color(theme.colors.onSecondaryContainer)
          .alpha(0.6)
          .rgb()
          .toString(),
      };
    }

    return {
      textColor: theme.colors.onSurface,
      subTextColor: color(theme.colors.onSurface).alpha(0.8).rgb().toString(),
      overlineTextColor: color(theme.colors.onSurface)
        .alpha(0.6)
        .rgb()
        .toString(),
    };
  }

  // focusState === 'focused' | 'pressed'
  return {
    backgroundColor: theme.colors.onSurface,
    textColor: theme.colors.surface,
    subTextColor: color(theme.colors.surface).alpha(0.8).rgb().toString(),
    overlineTextColor: color(theme.colors.surface).alpha(0.6).rgb().toString(),
  };
};
