import * as React from 'react';
import {
  AccessibilityRole,
  Animated,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import type { ThemeProp } from '../../types';
import { forwardRef } from '../../utils/forwardRef';
import { splitStyles } from '../../utils/splitStyles';
import { type ButtonVariant, getButtonColors } from './utils';
import { useInternalTheme } from '../../styles/ThemeProvider';
import { useFocusSystemHandlers } from '../../hooks/useFocusSystemHandlers';
import Text from '../Typography/Text';

// TODO: need to extend for Props
// import type { TouchableOpacityProps } from 'react-native';

export type Props = {
  /**
   * Variant of the button. You can change the variant to adjust the styling to give it desired emphasis.
   */
  variant?: ButtonVariant;
  /**
   * Icon to display for the `Button`.
   */
  icon?: React.ComponentProps<typeof Icon>['name'];
  /**
   * Custom icon's size.
   */
  iconSize?: number;
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Make the label text uppercased. Note that this won't work if you pass React elements as children.
   */
  uppercase?: boolean;
  /**
   * Label text of the button.
   */
  children: React.ReactNode;
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
  /**
   * Specifies the largest possible scale a text font can reach.
   */
  maxFontSizeMultiplier?: number;
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
 * import { Button } from '@ds/components';
 *
 * const MyComponent = () => (
 *   <Button icon="camera" onPress={() => console.log('Pressed')}>
 *     Press me
 *   </Button>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Button = (
  {
    disabled,
    variant = 'default',
    icon,
    iconSize: customIconSize,
    children,
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
    uppercase = false,
    contentStyle,
    testID = 'button',
    maxFontSizeMultiplier,
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

  const { roundness } = theme;

  const flattenedStyles = (StyleSheet.flatten(style) || {}) as ViewStyle;
  const [, borderRadiusStyles] = splitStyles(
    flattenedStyles,
    (style) => style.startsWith('border') && style.endsWith('Radius')
  );

  const borderRadius = 5 * roundness;
  const iconSize = customIconSize ?? 20;

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

  const font = theme.fonts.labelLarge;

  const textStyle = {
    color: textColor,
    ...font,
  } as StyleProp<TextStyle>;

  const iconStyle =
    StyleSheet.flatten(contentStyle)?.flexDirection === 'row-reverse'
      ? [styles.iconReverse]
      : [styles.icon];

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
      style={[styles.container, style]}
      testID={`${testID}-container`}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
    >
      <Animated.View style={[{ transform: [{ scale }] }]}>
        <View style={[styles.buttonContent, buttonStyle, contentStyle]}>
          {icon && (
            <View style={iconStyle} testID={`${testID}-icon-container`}>
              <Icon name={icon} size={iconSize} color={textColor} />
            </View>
          )}
          {children && (
            <Text
              variant="labelLarge"
              selectable={false}
              numberOfLines={1}
              testID={`${testID}-label`}
              style={[
                styles.buttonLabel,
                textStyle,
                uppercase && styles.uppercaseLabel,
              ]}
              maxFontSizeMultiplier={maxFontSizeMultiplier}
            >
              {children}
            </Text>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  buttonContent: {
    height: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16 - 1.5,
    borderWidth: 1.5,
    borderStyle: 'solid',
  },
  buttonLabel: {
    textAlign: 'center',
  },
  uppercaseLabel: {
    textTransform: 'uppercase',
  },
  icon: {
    marginLeft: -4,
    marginRight: 4,
  },
  iconReverse: {
    marginLeft: 4,
    marginRight: -4,
  },
});

export default forwardRef(Button);
