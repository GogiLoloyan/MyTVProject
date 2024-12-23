import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import color from 'color';

import type { ThemeProp } from '../../types';
import { Colors } from '../../styles/themes/tokens';
import { useInternalTheme } from '../../styles/ThemeProvider';

export type Props = {
  progress?: number;
  /**
   * @optional
   */
  theme?: ThemeProp;
};

const ProgressBar = ({ progress = 0, theme: themeOverrides }: Props) => {
  const theme = useInternalTheme(themeOverrides);
  const borderRadius = 0.5 * theme.roundness;

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius,
          backgroundColor: color(Colors.neutral100).alpha(0.2).rgb().toString(),
        },
      ]}
    >
      <View
        style={[
          styles.progressBar,
          {
            borderRadius,
            width: `${progress}%`,
            backgroundColor: Colors.neutral100,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 3,
    width: '100%',
    justifyContent: 'flex-start',
  },
  progressBar: {
    height: 3,
  },
});

export default ProgressBar;
