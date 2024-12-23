import * as React from 'react';
import { View, StyleSheet, type ViewStyle, type StyleProp } from 'react-native';

import type { ThemeProp } from '../../types';
import { forwardRef } from '../../utils/forwardRef';
import Tab from './Tab';

export type Props = {
  /**
   * Title text of the button.
   */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
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
 * A Tabs is component that the user can press to navigate a different content.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Tabs } from '@ds/components';
 *
 * const MyComponent = () => (
 *   <Tabs>
 *     <Tabs.Item
 *        selected={true}
 *        icon="account-circle-outline"
 *     >
 *        Title
 *     </Tabs.Item>
 *   </Tabs>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Tabs = (
  { children, style, testID = 'tabs', ...rest }: Props,
  ref: React.ForwardedRef<View>
) => {
  return (
    <View
      {...rest}
      ref={ref}
      style={[styles.container, style]}
      testID={`${testID}-container`}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    flexDirection: 'row',
  },
});

const TabsWithRef = forwardRef(Tabs);

export default Object.assign(TabsWithRef, { Tab });
