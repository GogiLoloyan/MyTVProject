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

import { type ButtonVariant, getButtonColors } from './utils';
import { useInternalTheme } from '../../styles/ThemeProvider';
import type { ThemeProp } from '../../types';
import { forwardRef } from '../../utils/forwardRef';
import { splitStyles } from '../../utils/splitStyles';
import { useFocusSystemHandlers } from '../../hooks/useFocusSystemHandlers';

const sizes = {
  s: 16,
  m: 20,
  l: 28,
};

const buttonSizes = {
  s: 28,
  m: 40,
  l: 56,
};

export type Props = {
  /**
   * Variant of the button. You can change the variant to adjust the styling to give it desired emphasis.
   */
  variant?: ButtonVariant;
  /**
   * Icon to display for the `Button`.
   */
  icon: React.ComponentProps<typeof Icon>['name'];
  /**
   * Custom icon's size.
   */
  size?: 's' | 'm' | 'l';
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Accessibility hint for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityHint?: string;
  /**
   * Accessibility role for the button. The "button" role is set by default.
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
   * Style of button's inner content.
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
 * A button is component that the user can press to trigger an action.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { IconButton } from '@ds/components';
 *
 * const MyComponent = () => (
 *   <IconButton icon="camera" onPress={() => console.log('Pressed')} />
 * );
 *
 * export default MyComponent;
 * ```
 */
const IconButton = (
  {
    disabled,
    variant = 'default',
    icon,
    size = 'm',
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
    testID = 'icon-button',
    ...rest
  }: Props,
  ref: React.ForwardedRef<View>
) => {
  const theme = useInternalTheme(themeOverrides);

  const {
    scale,
    focusState,
    handleBlur,
    handleFocus,
    handlePressIn,
    handlePressOut,
  } = useFocusSystemHandlers({
    disabled,
    onPressIn,
    onPressOut,
  });

  const flattenedStyles = (StyleSheet.flatten(style) || {}) as ViewStyle;
  const [, borderRadiusStyles] = splitStyles(
    flattenedStyles,
    (style) => style.startsWith('border') && style.endsWith('Radius')
  );

  const iconSize = sizes[size];
  const buttonSize = buttonSizes[size];
  const borderRadius = buttonSize / 2;

  const { backgroundColor, borderColor, textColor } = getButtonColors({
    variant,
    theme,
    disabled,
    focusState,
  });

  const buttonStyle = {
    borderColor,
    borderRadius: borderRadiusStyles.borderRadius ?? borderRadius,
    backgroundColor,
  } as StyleProp<ViewStyle>;

  return (
    <TouchableOpacity
      {...rest}
      ref={ref}
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
      <Animated.View style={[{ transform: [{ scale }] }]}>
        <View
          style={[
            styles.buttonContent,
            buttonStyle,
            contentStyle,
            { width: buttonSize, height: buttonSize },
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
  buttonContent: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'solid',
  },
  icon: {},
});

export default forwardRef(IconButton);
