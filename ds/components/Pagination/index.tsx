import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import color from 'color';

import type { ThemeProp } from '../../types';
import { Colors } from '../../styles/themes/tokens';
import { useInternalTheme } from '../../styles/ThemeProvider';

export type Props = {
  variant?: 'default' | 'with-background';
  pageCount: number;
  currentPage?: number;
  /**
   * @optional
   */
  theme?: ThemeProp;
};

const Pagination = ({
  variant = 'default',
  pageCount,
  currentPage,
  theme: themeOverrides,
}: Props) => {
  const theme = useInternalTheme(themeOverrides);
  const borderRadius = 4 * theme.roundness;

  return (
    <View
      style={[
        styles.container,
        variant === 'with-background' && {
          ...styles.containerWithBackground,
          borderRadius,
          backgroundColor: color(Colors.neutral0).alpha(0.2).rgb().toString(),
        },
      ]}
    >
      {[...new Array(pageCount)].map((_el, page) => (
        <View
          key={page + 1}
          style={[
            styles.item,
            {
              backgroundColor:
                currentPage === page + 1
                  ? Colors.neutral100
                  : color(Colors.neutral100).alpha(0.2).rgb().toString(),
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerWithBackground: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  item: {
    width: 8,
    height: 8,
    borderRadius: '100%',
  },
});

export default Pagination;
