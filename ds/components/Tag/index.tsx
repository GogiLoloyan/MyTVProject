import * as React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import type { ThemeProp } from '../../types';
import { useInternalTheme } from '../../styles/ThemeProvider';
import Text from '../Typography/Text';

// TODO: need to extend for Props
// import type { TouchableOpacityProps } from 'react-native';

export type TagVariant = 'default' | 'outlined';

export type Props = {
  /**
   * Variant of the tag. You can change the variant to adjust the styling to give it desired emphasis.
   */
  variant?: TagVariant;
  /**
   * Tag's size.
   */
  size?: 'default' | 'large';
  /*
   * Make the label text uppercased. Note that this won't work if you pass React elements as children.
   */
  uppercase?: boolean;
  /**
   * Label text of the tag.
   */
  children: React.ReactNode;
  /**
   * Function to execute on press.
   */
  onPress?: (e: GestureResponderEvent) => void;
  /**
   * Function to execute as soon as the touchable element is pressed and invoked even before onPress.
   */
  onPressIn?: (e: GestureResponderEvent) => void;
  /**
   * Function to execute as soon as the touch is released even before onPress.
   */
  onPressOut?: (e: GestureResponderEvent) => void;
  /**
   * Function to execute on long press.
   */
  onLongPress?: (e: GestureResponderEvent) => void;
  /**
   * The number of milliseconds a user must touch the element before executing `onLongPress`.
   */
  delayLongPress?: number;
  /**
   * Style of tag's inner content.
   * Use this prop to apply custom height and width and to set the icon on the right with `flexDirection: 'row-reverse'`.
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Specifies the largest possible scale a text font can reach.
   */
  maxFontSizeMultiplier?: number;
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
 * A tag is component that the user can press to trigger an action.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Tag } from '@ds/components';
 *
 * const MyComponent = () => (
 *   <Tag onPress={() => console.log('Pressed')}>
 *     Press me
 *   </Tag>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Tag = ({
  variant = 'default',
  size,
  children,
  theme: themeOverrides,
  contentStyle,
  testID = 'tag',
  maxFontSizeMultiplier,
}: Props) => {
  const theme = useInternalTheme(themeOverrides);

  const { roundness } = theme;

  const borderRadius = 3 * roundness;

  return (
    <View
      style={[
        styles.tagContent,
        contentStyle,
        {
          borderRadius,
        },
        size === 'large' && styles.tagContentLarge,
        variant === 'default' && {
          backgroundColor: theme.colors.surfaceVariant,
        },
        variant === 'outlined' && {
          borderColor: theme.colors.surfaceVariant,
          ...styles.tagContentOutlined,
        },
      ]}
      testID={`${testID}-content`}
    >
      <Text
        variant={size === 'default' ? 'labelSmall' : 'labelLarge'}
        selectable={false}
        numberOfLines={1}
        testID={`${testID}-label`}
        style={[
          styles.tagLabel,
          {
            color: theme.colors.onSurfaceVariant,
          },
        ]}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
      >
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tagContent: {
    overflow: 'hidden',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  tagContentLarge: {
    height: 24,
  },
  tagContentOutlined: {
    borderWidth: 1,
    borderStyle: 'solid',
  },
  tagLabel: {},
});

export default Tag;
