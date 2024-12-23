import color from 'color';

import type { InternalTheme } from '../../../types';
import type { FocusState } from '../../../hooks/useFocusSystemHandlers';

export type TabVariant = 'primary' | 'secondary';

type BaseProps = {
  variant: TabVariant;
  theme: InternalTheme;
  disabled?: boolean;
  focusState: FocusState;
  selected?: boolean;
};

export const getTabColors = ({
  variant,
  theme,
  focusState,
  disabled,
  selected,
}: BaseProps) => {
  if (variant === 'primary') {
    if (disabled) {
      // tabState === 'default' | 'focused' | 'pressed' (selected)
      return {
        backgroundColor: 'transparent',
        textColor: color(theme.colors.onSurfaceVariant)
          .alpha(0.4)
          .rgb()
          .toString(),
      };
    }

    if (selected) {
      return {
        backgroundColor: color(theme.colors.secondaryContainer)
          .alpha(0.4)
          .rgb()
          .toString(),
        textColor: theme.colors.onSecondaryContainer,
      };
    }

    if (focusState === 'default') {
      return {
        backgroundColor: 'transparent',
        textColor: theme.colors.onSurfaceVariant,
      };
    }

    // tabState === 'focused' | 'pressed'
    return {
      backgroundColor: theme.colors.inverseSurface,
      textColor: theme.colors.inverseOnSurface,
    };
  }

  if (variant === 'secondary') {
    if (disabled) {
      // tabState === 'default' | 'focused' | 'pressed' (selected)
      return {
        backgroundColor: 'transparent',
        textColor: color(theme.colors.onSurfaceVariant)
          .alpha(0.4)
          .rgb()
          .toString(),
      };
    }

    if (selected) {
      return {
        backgroundColor: 'transparent',
        textColor: theme.colors.secondary,
      };
    }

    if (focusState === 'default') {
      return {
        backgroundColor: 'transparent',
        textColor: theme.colors.onSurfaceVariant,
      };
    }

    // tabState === 'focused' | 'pressed'
    return {
      backgroundColor: 'transparent',
      textColor: theme.colors.primary,
    };
  }

  return {
    backgroundColor: 'transparent',
    textColor: theme.colors.onSurfaceVariant,
  };
};
