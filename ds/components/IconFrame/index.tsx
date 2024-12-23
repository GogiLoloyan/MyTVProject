import * as React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  AccessibilityRole,
  GestureResponderEvent,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { getIconColors } from './utils';
import { useInternalTheme } from '../../styles/ThemeProvider';
import type { ThemeProp } from '../../types';
import { forwardRef } from '../../utils/forwardRef';
import { splitStyles } from '../../utils/splitStyles';
import { useFocusSystemHandlers } from '../../hooks/useFocusSystemHandlers';

export type FrameSize = 'xs' | 's' | 'm' | 'l' | 'xl';

const frameSizes: Record<FrameSize, number> = {
  xs: 24,
  s: 32,
  m: 48,
  l: 64,
  xl: 88,
};

export type Props = {
  /**
   * Icon to display for the `IconFrame`.
   */
  icon: React.ComponentProps<typeof Icon>['name'];
  /**
   * Custom frame size.
   */
  size?: FrameSize;
  focusable?: boolean;
  /**
   * Accessibility label for the icon frame. This is read by the screen reader when the user taps the icon frame.
   */
  accessibilityLabel?: string;
  /**
   * Accessibility hint for the icon frame. This is read by the screen reader when the user taps the icon frame.
   */
  accessibilityHint?: string;
  /**
   * Accessibility role for the icon frame. The "button" role is set by default.
   */
  accessibilityRole?: AccessibilityRole;
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
   * Style of icon frame's inner content.
   * Use this prop to apply custom height and width and to set the icon on the right with `flexDirection: 'row-reverse'`.
   */
  contentStyle?: StyleProp<ViewStyle>;
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
 * A icon frame is component that the user can press to trigger an action.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { IconFrame } from '@ds/components';
 *
 * const MyComponent = () => (
 *   <IconFrame icon="camera" onPress={() => console.log('Pressed')} />
 * );
 *
 * export default MyComponent;
 * ```
 */
const IconFrame = (
  {
    icon,
    size = 'm',
    focusable,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole = 'button',
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    delayLongPress,
    style,
    theme: themeOverrides,
    contentStyle,
    testID = 'icon-frame',
    ...rest
  }: Props,
  ref: React.ForwardedRef<View>
) => {
  const theme = useInternalTheme(themeOverrides);

  const { scale, handleBlur, handleFocus, handlePressIn, handlePressOut } =
    useFocusSystemHandlers({
      onPressIn,
      onPressOut,
    });

  const flattenedStyles = (StyleSheet.flatten(style) || {}) as ViewStyle;
  const [, borderRadiusStyles] = splitStyles(
    flattenedStyles,
    (style) => style.startsWith('border') && style.endsWith('Radius')
  );

  const frameSize = frameSizes[size];
  const iconSize = frameSize / 2;
  const borderRadius = frameSize;

  const { backgroundColor, textColor } = getIconColors({
    theme,
  });

  const buttonStyle = {
    borderRadius: borderRadiusStyles.borderRadius ?? borderRadius,
    backgroundColor,
  } as StyleProp<ViewStyle>;

  return (
    <TouchableOpacity
      {...rest}
      ref={ref}
      focusable={focusable}
      onPress={onPress}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={onLongPress}
      delayLongPress={delayLongPress}
      activeOpacity={1} // Prevent opacity change on press
      style={styles.container}
      testID={`${testID}-container`}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
    >
      <Animated.View style={[focusable && { transform: [{ scale }] }]}>
        <View
          style={[
            styles.iconFrameContent,
            buttonStyle,
            contentStyle,
            { width: frameSize, height: frameSize },
          ]}
        >
          <Icon
            testID={`${testID}-icon`}
            name={icon}
            size={iconSize}
            color={textColor}
          />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  iconFrameContent: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default forwardRef(IconFrame);
