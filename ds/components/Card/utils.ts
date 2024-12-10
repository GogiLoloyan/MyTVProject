import color from 'color';

import { Colors } from '../../styles/themes/tokens';
import type { InternalTheme } from '../../types';
import type { FocusState } from '../../hooks/useFocusSystemHandlers';

export type CardMode =
  | 'standard'
  | 'classic'
  | 'compact'
  | 'wide-standard'
  | 'wide-classic';

type BaseProps = {
  mode: CardMode;
  theme: InternalTheme;
  disabled?: boolean;
  focusState: FocusState;
};

export const getButtonColors = ({ mode, theme, focusState }: BaseProps) => {
  const titleColor = theme.colors.onSurface;
  const subtitleColor = color(theme.colors.onSurface)
    .alpha(0.6)
    .rgb()
    .toString();
  const descriptionColor = color(theme.colors.onSurface)
    .alpha(0.8)
    .rgb()
    .toString();

  const commonColors = {
    titleColor,
    subtitleColor,
    descriptionColor,
    borderColor:
      focusState === 'default' ? 'transparent' : theme.colors.outline,
    backgroundColor: 'transparent',
  };

  if (mode === 'standard') {
    return {
      ...commonColors,
    };
  }

  if (mode === 'classic') {
    return {
      ...commonColors,
      backgroundColor: theme.colors.surfaceVariant,
    };
  }

  if (mode === 'compact') {
    return {
      ...commonColors,
      titleColor: Colors.neutral100,
      subtitleColor: color(Colors.neutral100).alpha(0.6).rgb().toString(),
    };
  }

  if (mode === 'wide-standard') {
    return {
      ...commonColors,
    };
  }

  if (mode === 'wide-classic') {
    return {
      ...commonColors,
      backgroundColor: theme.colors.surfaceVariant,
    };
  }

  return {
    ...commonColors,
  };
};
