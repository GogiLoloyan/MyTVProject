import color from 'color';

import type { InternalTheme } from '../../types';

export type TextInputVariant = 'outlined' | 'filled';
export type LabelVariant = 'aboveInput' | 'insideInput';

type BaseProps = {
  theme: InternalTheme;
  variant: TextInputVariant;
  labelVariant: LabelVariant;
  disabled?: boolean;
  hasError?: boolean;
  focused?: boolean;
  filled?: boolean;
};

export const getTextInputColors = ({
  theme,
  variant,
  labelVariant,
  hasError,
  disabled,
  focused,
}: BaseProps) => {
  const common = {
    labelColor:
      labelVariant === 'aboveInput'
        ? theme.colors.onSurfaceVariant
        : color(theme.colors.onSurface).alpha(0.6).rgb().toString(),
    supportingTextColor: hasError
      ? theme.colors.error
      : theme.colors.onSurfaceVariant,
  };

  if (variant === 'filled') {
    if (disabled) {
      const labelColor =
        labelVariant === 'aboveInput'
          ? color(theme.colors.onSurfaceVariant).alpha(0.4).rgb().toString()
          : color(theme.colors.onSurface).alpha(0.5).rgb().toString();

      if (focused) {
        return {
          ...common,
          inputTextColor: theme.colors.onSurface,
          labelColor,
          borderColor: theme.colors.outline,
          backgroundColor: theme.colors.inverseOnSurface,
        };
      }

      return {
        ...common,
        inputTextColor: theme.colors.onSurface,
        labelColor,
        borderColor: 'transparent',
        backgroundColor: theme.colors.inverseOnSurface,
      };
    }

    if (hasError) {
      const labelColor =
        labelVariant === 'aboveInput'
          ? theme.colors.error
          : color(theme.colors.error).alpha(0.5).rgb().toString();

      const borderColor = color(theme.colors.onErrorContainer)
        .alpha(0.6)
        .rgb()
        .toString();

      if (focused) {
        return {
          ...common,
          inputTextColor: theme.colors.onSurface,
          labelColor,
          borderColor,
          backgroundColor: color(theme.colors.error)
            .alpha(0.2)
            .rgb()
            .toString(),
        };
      }

      return {
        ...common,
        inputTextColor: theme.colors.onSurface,
        labelColor,
        borderColor: 'transparent',
        backgroundColor: color(theme.colors.error).alpha(0.2).rgb().toString(),
      };
    }

    if (focused) {
      return {
        ...common,
        inputTextColor: theme.colors.onSurface,
        borderColor: theme.colors.outline,
        backgroundColor: theme.colors.inverseOnSurface,
      };
    }

    return {
      ...common,
      inputTextColor: theme.colors.onSurface,
      borderColor: 'transparent',
      backgroundColor: theme.colors.inverseOnSurface,
    };
  }

  // variant = 'outlined'
  if (disabled) {
    const labelColor =
      labelVariant === 'aboveInput'
        ? color(theme.colors.onSurfaceVariant).alpha(0.4).rgb().toString()
        : color(theme.colors.onSurface).alpha(0.5).rgb().toString();

    if (focused) {
      return {
        ...common,
        inputTextColor: theme.colors.onSurface,
        labelColor,
        borderColor: theme.colors.outline,
        backgroundColor: theme.colors.inverseOnSurface,
      };
    }

    return {
      ...common,
      inputTextColor: theme.colors.onSurface,
      labelColor,
      borderColor: theme.colors.outline,
      backgroundColor: 'transparent',
    };
  }

  if (hasError) {
    const labelColor =
      labelVariant === 'aboveInput'
        ? theme.colors.error
        : color(theme.colors.error).alpha(0.5).rgb().toString();

    const borderColor = color(theme.colors.onErrorContainer)
      .alpha(0.6)
      .rgb()
      .toString();

    if (focused) {
      return {
        ...common,
        inputTextColor: theme.colors.onSurface,
        labelColor,
        borderColor,
        backgroundColor: color(theme.colors.error).alpha(0.2).rgb().toString(),
      };
    }

    return {
      ...common,
      inputTextColor: theme.colors.onSurface,
      labelColor,
      borderColor,
      backgroundColor: 'transparent',
    };
  }

  if (focused) {
    return {
      ...common,
      inputTextColor: theme.colors.onSurface,
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.inverseOnSurface,
    };
  }

  return {
    ...common,
    inputTextColor: theme.colors.onSurface,
    backgroundColor: 'transparent',
    borderColor: theme.colors.outline,
  };
};
