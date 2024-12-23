import color from 'color';

import type { InternalTheme } from '../../types';
import type { FocusState } from '../../hooks/useFocusSystemHandlers';

export type ButtonVariant = 'default' | 'outlined';

type BaseProps = {
  variant: ButtonVariant;
  theme: InternalTheme;
  disabled?: boolean;
  focusState: FocusState;
};

export const getButtonColors = ({
  variant,
  theme,
  focusState,
  disabled,
}: BaseProps) => {
  if (variant === 'default') {
    if (disabled) {
      if (focusState === 'focused') {
        return {
          backgroundColor: color(theme.colors.surfaceVariant)
            .alpha(0.2)
            .rgb()
            .toString(),
          borderColor: color(theme.colors.onSurfaceVariant)
            .alpha(0.2)
            .rgb()
            .toString(),
          textColor: color(theme.colors.inverseSurface)
            .alpha(0.4)
            .rgb()
            .toString(),
        };
      }

      const commonColor = color(theme.colors.surfaceVariant)
        .alpha(0.4)
        .rgb()
        .toString();

      // buttonState === 'default' | 'pressed'
      return {
        backgroundColor: commonColor,
        borderColor: commonColor,
        textColor: color(theme.colors.inverseSurface)
          .alpha(0.4)
          .rgb()
          .toString(),
      };
    }

    if (focusState === 'default') {
      return {
        backgroundColor: theme.colors.surfaceVariant,
        borderColor: theme.colors.surfaceVariant,
        textColor: color(theme.colors.inverseSurface)
          .alpha(0.8)
          .rgb()
          .toString(),
      };
    }

    // buttonState === 'focused' | 'pressed'
    return {
      backgroundColor: theme.colors.inverseSurface,
      borderColor: theme.colors.inverseSurface,
      textColor: theme.colors.inverseOnSurface,
    };
  }

  if (variant === 'outlined') {
    if (disabled) {
      if (focusState === 'default') {
        return {
          backgroundColor: 'transparent',
          borderColor: color(theme.colors.onSurfaceVariant)
            .alpha(0.2)
            .rgb()
            .toString(),
          textColor: color(theme.colors.inverseSurface)
            .alpha(0.4)
            .rgb()
            .toString(),
        };
      }

      const commonColor = color(theme.colors.onSurfaceVariant)
        .alpha(0.2)
        .rgb()
        .toString();

      // buttonState === 'default' | 'pressed'
      return {
        backgroundColor: commonColor,
        borderColor: commonColor,
        textColor: color(theme.colors.inverseSurface)
          .alpha(0.4)
          .rgb()
          .toString(),
      };
    }

    if (focusState === 'default') {
      return {
        backgroundColor: 'transparent',
        borderColor: color(theme.colors.onSurfaceVariant)
          .alpha(0.4)
          .rgb()
          .toString(),
        textColor: color(theme.colors.inverseSurface)
          .alpha(0.8)
          .rgb()
          .toString(),
      };
    }

    // buttonState === 'focused' | 'pressed'
    return {
      backgroundColor: theme.colors.inverseSurface,
      borderColor: theme.colors.outline,
      textColor: theme.colors.inverseOnSurface,
    };
  }

  return {
    backgroundColor: theme.colors.surfaceVariant,
    borderColor: theme.colors.surfaceVariant,
    textColor: color(theme.colors.inverseSurface).alpha(0.8).rgb().toString(),
  };
};
