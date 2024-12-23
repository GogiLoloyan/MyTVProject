import * as React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

import Text from '../Typography/Text';
import type { ThemeProp } from '../../types';
import { useInternalTheme } from '../../styles/ThemeProvider';

export type Props = React.ComponentPropsWithRef<typeof Text> & {
  /**
   * Title text for the `DialogTitle`.
   */
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  /**
   * @optional
   */
  theme?: ThemeProp;
};

/**
 * A component to show a title in a Dialog.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Dialog, Portal, Text } from '@ds/components';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const hideDialog = () => setVisible(false);
 *
 *   return (
 *     <Portal>
 *       <Dialog visible={visible} onDismiss={hideDialog}>
 *         <Dialog.Title>This is a title</Dialog.Title>
 *         <Dialog.Content>
 *           <Text variant="bodyMedium">This is simple dialog</Text>
 *         </Dialog.Content>
 *       </Dialog>
 *     </Portal>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DialogTitle = ({
  children,
  theme: themeOverrides,
  style,
  ...rest
}: Props) => {
  const theme = useInternalTheme(themeOverrides);
  const { colors } = theme;

  const headerTextStyle = {
    color: colors.onSurface,
  };

  return (
    <Text
      variant="headlineMedium"
      accessibilityRole="header"
      style={[styles.text, headerTextStyle, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

DialogTitle.displayName = 'Dialog.Title';

const styles = StyleSheet.create({
  text: {
  },
});

export default DialogTitle;

// @component-docs ignore-next-line
export { DialogTitle };
