import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import color from 'color';

import type { ThemeProp } from '../../types';
import { useInternalTheme } from '../../styles/ThemeProvider';
import IconFrame, { FrameSize } from '../IconFrame';

export type Props = {
  /**
   *  Custom color for action icon.
   */
  iconColor?: string;
  /**
   *  Custom color for action icon background.
   */
  backgroundColor?: string;
  /**
   * Name of the icon to show.
   */
  icon: React.ComponentProps<typeof Icon>['name'];
  /**
   * Optional icon size.
   */
  size?: FrameSize;
  /**
   * @optional
   */
  theme?: ThemeProp;
};

/**
 * A component to show an icon in a Dialog.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { StyleSheet } from 'react-native';
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
 *         <Dialog.Icon icon="alert" />
 *         <Dialog.Title style={styles.title}>This is a title</Dialog.Title>
 *         <Dialog.Content>
 *           <Text variant="bodyMedium">This is simple dialog</Text>
 *         </Dialog.Content>
 *       </Dialog>
 *     </Portal>
 *   );
 * };
 *
 * const styles = StyleSheet.create({
 *   title: {
 *     textAlign: 'center',
 *   },
 * })
 *
 * export default MyComponent;
 * ```
 */
const DialogIcon = ({
  size = 'm',
  backgroundColor,
  icon,
  theme: themeOverrides,
}: Props) => {
  const theme = useInternalTheme(themeOverrides);

  return (
    <View style={styles.wrapper}>
      <IconFrame
        icon={icon}
        size={size}
        contentStyle={{
          backgroundColor:
            backgroundColor ??
            color(theme.colors.surfaceVariant).alpha(0.4).rgb().toString(),
        }}
      />
    </View>
  );
};

DialogIcon.displayName = 'Dialog.Icon';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DialogIcon;

// @component-docs ignore-next-line
export { DialogIcon };
