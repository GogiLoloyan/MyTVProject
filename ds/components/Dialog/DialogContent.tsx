import * as React from 'react';
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native';

export type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Content of the `DialogContent`.
   */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * A component to show content in a Dialog.
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
const DialogContent = (props: Props) => (
  <View {...props} style={[styles.container, props.style]}>
    {props.children}
  </View>
);

DialogContent.displayName = 'Dialog.Content';

const styles = StyleSheet.create({
  container: {},
});

export default DialogContent;
