import * as React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';

import type { ThemeProp } from '../../types';
import { forwardRef } from '../../utils/forwardRef';
import Item from './Item';

export type Props = {
  /**
   * Title text of the button.
   */
  children: React.ReactNode;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  /**
   * @optional
   */
  theme?: ThemeProp;
  /**
   * testID to be used on tests.
   */
  testID?: string;
};

/**
 * A button is component that the user can press to trigger an action.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { LongButton } from '@ds/components';
 *
 * const MyComponent = () => (
 *   <List>
 *     <List.Item
 *        subTitle="Subtitle"
 *        icon="account-circle-outline"
 *     >
 *        Title
 *     </List.Item>
 *   </List>
 * );
 *
 * export default MyComponent;
 * ```
 */
const List = (
  { children, style, testID = 'list', ...rest }: Props,
  ref: React.ForwardedRef<View>
) => {
  return (
    <View
      {...rest}
      ref={ref}
      style={styles.container}
      testID={`${testID}-container`}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: 250,
  },
});

const ListWithRef = forwardRef(List);

export default Object.assign(ListWithRef, { Item });
