import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import type { ThemeProp } from '../../types';
import { DialogVariant } from './types';

export type Props = React.ComponentPropsWithRef<typeof View> & {
  dialogVariant?: DialogVariant;
  /**
   * Content of the `DialogActions`.
   */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme?: ThemeProp;
};

/**
 * A component to show a list of actions in a Dialog.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Button, Dialog, Portal } from '@ds/components';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const hideDialog = () => setVisible(false);
 *
 *   return (
 *     <Portal>
 *       <Dialog visible={visible} onDismiss={hideDialog}>
 *         <Dialog.Actions>
 *           <Button onPress={() => console.log('Cancel')}>Cancel</Button>
 *           <Button onPress={() => console.log('Ok')}>Ok</Button>
 *         </Dialog.Actions>
 *       </Dialog>
 *     </Portal>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DialogActions = ({ dialogVariant, ...props }: Props) => {
  const actionsLength = React.Children.toArray(props.children).length;

  return (
    <View
      {...props}
      style={[
        styles.container,
        props.style,
        dialogVariant === 'standart' && {
          paddingTop: 8,
        },
        dialogVariant === 'full-screen' && {
          paddingTop: 32,
        },
        dialogVariant === 'two-columns' && {
          gap: 12,
          flexDirection: 'column',
          width: 280,
        },
      ]}
    >
      {React.Children.map(props.children, (child, i) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              compact: true,
              uppercase: false,
              style: [
                {
                  marginRight: i + 1 === actionsLength ? 0 : 12,
                },
                child.props.style,
              ],
            })
          : child
      )}
    </View>
  );
};

DialogActions.displayName = 'Dialog.Actions';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DialogActions;
