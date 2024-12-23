import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  Modal,
  View,
  SafeAreaView,
} from 'react-native';
import color from 'color';

import DialogIcon from './DialogIcon';
import DialogTitle from './DialogTitle';
import DialogActions from './DialogActions';
import DialogContent from './DialogContent';
import DialogScrollArea from './DialogScrollArea';
import type { ThemeProp } from '../../types';
import { Colors } from '../../styles/themes/tokens';
import { useInternalTheme } from '../../styles/ThemeProvider';
import type { DialogVariant } from './types';

export type Props = React.ComponentPropsWithRef<typeof Modal> & {
  /**
   * Variant of the Dialog. You can change the variant to adjust different styling.
   */
  variant?: DialogVariant;
  /**
   * Callback that is called when the user dismisses the dialog.
   */
  onDismiss?: () => void;
  /**
   * Determines Whether the dialog is visible.
   */
  visible: boolean;
  /**
   * Content of the `Dialog`.
   */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contsntStyle?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme?: ThemeProp;
  /**
   * testID to be used on tests.
   */
  testID?: string;
};

const DIALOG_ELEVATION: number = 24;

/**
 * Dialogs inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.
 * To render the `Dialog` above other components, you'll need to wrap it with the [`Portal`](../../Portal) component.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Button, Dialog, Portal, Text } from '@ds/components';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const showDialog = () => setVisible(true);
 *
 *   const hideDialog = () => setVisible(false);
 *
 *   return (
 *     <View>
 *       <Button onPress={showDialog}>Show Dialog</Button>
 *       <Portal>
 *         <Dialog visible={visible} onDismiss={hideDialog}>
 *           <Dialog.Title>Alert</Dialog.Title>
 *           <Dialog.Content>
 *             <Text variant="bodyMedium">This is simple dialog</Text>
 *           </Dialog.Content>
 *           <Dialog.Actions>
 *             <Button onPress={hideDialog}>Done</Button>
 *           </Dialog.Actions>
 *         </Dialog>
 *       </Portal>
 *     </View>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const Dialog = ({
  variant = 'standart',
  children,
  onDismiss,
  visible = false,
  style,
  contsntStyle,
  theme: themeOverrides,
  testID,
  animationType = 'fade',
  ...rest
}: Props) => {
  //   const { right, left } = useSafeAreaInsets();
  const theme = useInternalTheme(themeOverrides);
  const { roundness } = theme;
  const borderRadius = 4 * roundness;

  return (
    <Modal
      visible={visible}
      animationType={animationType}
      onDismiss={onDismiss}
      onRequestClose={onDismiss}
      transparent={true}
      testID={testID}
      {...rest}
    >
      <SafeAreaView
        style={[
          styles.container,
          style,
          variant === 'standart' && {
            backgroundColor: color(Colors.neutral0).alpha(0.6).rgb().toString(),
          },
          (variant === 'full-screen' || variant === 'two-columns') && {
            backgroundColor: theme.colors.background,
            width: '100%',
            height: '100%',
          },
        ]}
      >
        <View
          style={[
            styles.dialogContent,
            contsntStyle,
            variant === 'standart' && {
              padding: 24,
              borderRadius,
              backgroundColor: theme.colors.surfaceContainer,
            },
            variant === 'full-screen' && {
              padding: 24,
              backgroundColor: theme.colors.background,
              alignItems: 'center',
            },
            variant === 'two-columns' && {
              gap: 92,
              padding: 24,
              backgroundColor: theme.colors.background,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'center',
              maxWidth: '90%',
            },
          ]}
        >
          {React.Children.toArray(children).map((child) => {
            return React.cloneElement(child as React.ReactElement<any>, {
              dialogVariant: variant,
            });
          })}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

// @component ./DialogContent.tsx
Dialog.Content = DialogContent;
// @component ./DialogActions.tsx
Dialog.Actions = DialogActions;
// @component ./DialogTitle.tsx
Dialog.Title = DialogTitle;
// @component ./DialogScrollArea.tsx
Dialog.ScrollArea = DialogScrollArea;
// @component ./DialogIcon.tsx
Dialog.Icon = DialogIcon;

const styles = StyleSheet.create({
  container: {
    elevation: DIALOG_ELEVATION,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContent: {
    gap: 16,
  },
});

export default Dialog;
