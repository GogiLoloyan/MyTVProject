import color from 'color';

import type { InternalTheme } from '../../types';

type BaseProps = {
  theme: InternalTheme;
  disabled?: boolean;
};

export const getIconColors = ({ theme }: BaseProps) => {
  return {
    backgroundColor: color(theme.colors.surface).alpha(0.8).rgb().toString(),
    textColor: theme.colors.onSurface,
  };
};
