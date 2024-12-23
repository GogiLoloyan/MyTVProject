import color from 'color';

import type { InternalTheme } from '../../types';
import type { FocusState } from '../../hooks/useFocusSystemHandlers';

export type ChipBorderStyle = 'squared' | 'circled';

type BaseProps = {
  theme: InternalTheme;
  disabled?: boolean;
  focusState: FocusState;
  selected?: boolean;
  active?: boolean;
};

export const getChipColors = ({
  theme,
  focusState,
  disabled,
  selected,
  active,
}: BaseProps) => {
  if (disabled) {
    // chipState === 'default' | 'focused' | 'pressed' (selected)
    const backgroundColor = selected
      ? color(theme.colors.surfaceVariant).alpha(0.2).rgb().toString()
      : 'transparent';
    const borderColor = active
      ? color(theme.colors.outline).alpha(0.2).rgb().toString()
      : selected
      ? 'transparent'
      : color(theme.colors.surfaceVariant).alpha(0.2).rgb().toString();

    const textColor = color(theme.colors.outline).alpha(0.8).rgb().toString();

    return {
      textColor,
      borderColor,
      backgroundColor,
      imageIconColor: color(theme.colors.surfaceVariant).alpha(0.8).rgb().toString(),
      imageBackground: textColor,
    };
  }

  if (focusState === 'focused' || focusState === 'pressed') {
    const backgroundColor = selected
      ? theme.colors.primary
      : theme.colors.onSurface;
    const textColor = selected
      ? theme.colors.onPrimary
      : theme.colors.inverseOnSurface;

    return {
      textColor,
      borderColor: 'transparent',
      backgroundColor,
      imageIconColor: theme.colors.onPrimaryContainer,
      imageBackground: theme.colors.primaryContainer,
    };
  }

  // chipState === 'default'
  if (selected) {
    return {
      textColor: active
        ? theme.colors.onSecondaryContainer
        : color(theme.colors.onSecondaryContainer).alpha(0.8).rgb().toString(),
      borderColor: active
        ? color(theme.colors.secondary).alpha(0.4).rgb().toString()
        : 'transparent',
      backgroundColor: active
        ? color(theme.colors.secondaryContainer).alpha(0.4).rgb().toString()
        : color(theme.colors.secondaryContainer).alpha(0.2).rgb().toString(),
      imageIconColor: active
        ? theme.colors.onSecondary
        : color(theme.colors.onSecondary).alpha(0.8).rgb().toString(),
      imageBackground: active
        ? theme.colors.secondary
        : color(theme.colors.secondary).alpha(0.8).rgb().toString(),
    };
  }

  return {
    textColor: active
      ? theme.colors.onSurfaceVariant
      : color(theme.colors.onSurfaceVariant).alpha(0.8).rgb().toString(),
    borderColor: active
      ? color(theme.colors.outline).alpha(0.4).rgb().toString()
      : color(theme.colors.outline).alpha(0.2).rgb().toString(),
    backgroundColor: 'transparent',
  };
};
