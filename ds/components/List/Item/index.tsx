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

import { getColors } from './utils';
import Text from '../../Typography/Text';
import type { ThemeProp } from '../../../types';
import { forwardRef } from '../../../utils/forwardRef';
import { splitStyles } from '../../../utils/splitStyles';
import { useInternalTheme } from '../../../styles/ThemeProvider';
import { useFocusSystemHandlers } from '../../../hooks/useFocusSystemHandlers';

export type Props = {
  /**
   * Icon to display for the `ListItem`.
   */
  icon?: React.ComponentProps<typeof Icon>['name'];
  /**
   * Custom icon's size.
   */
  iconSize?: number;
  /**
   * Whether the list item is disabled. A disabled list item is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Whether the list item is selected.
   */
  selected?: boolean;
  /**
   * Title text of the list item.
   */
  children: React.ReactNode;
  /**
   * Sub title text of the list item.
   */
  subTitle?: React.ReactNode;
  /**
   * Overline text of the list item.
   */
  overlineText?: React.ReactNode;
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
 * import { Item } from '@ds/components';
 *
 * const MyComponent = () => (
 *   <Item icon="camera" onPress={() => console.log('List item Pressed')}>
 *     Press me
 *   </Item>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Item = (
  {
    icon,
    selected = false,
    disabled,
    iconSize: customIconSize,
    children,
    subTitle,
    overlineText,
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
    testID = 'list-item',
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

  const borderRadius = 2 * roundness;
  const iconSize = customIconSize ?? 24;

  const { backgroundColor, textColor, subTextColor, overlineTextColor } =
    getColors({
      theme,
      disabled,
      focusState,
      selected,
    });

  const buttonStyle = {
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
      accessibilityLabel={accessibilityLabel ?? children?.toString()}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
    >
      <Animated.View
        style={[
          styles.itemContent,
          buttonStyle,
          contentStyle,
          { transform: [{ scale }] },
        ]}
      >
        {icon && (
          <View style={styles.icon} testID={`${testID}-icon-container`}>
            <Icon name={icon} size={iconSize} color={textColor} />
          </View>
        )}

        <View style={styles.titlesContainer}>
          {overlineText && (
            <Text
              variant="labelSmall"
              selectable={false}
              numberOfLines={1}
              testID={`${testID}-overline-text`}
              style={[{ color: overlineTextColor }]}
            >
              {overlineText}
            </Text>
          )}
          <Text
            variant="titleMedium"
            selectable={false}
            numberOfLines={1}
            testID={`${testID}-title`}
            style={[styles.itemTitle, { color: textColor }]}
            maxFontSizeMultiplier={maxFontSizeMultiplier}
          >
            {children}
          </Text>
          {subTitle && (
            <Text
              variant="bodySmall"
              selectable={false}
              numberOfLines={1}
              testID={`${testID}-sub-title`}
              style={[styles.itemSubTitle, { color: subTextColor }]}
              maxFontSizeMultiplier={maxFontSizeMultiplier}
            >
              {subTitle}
            </Text>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    width: '100%',
  },
  itemContent: {
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  icon: {},
  titlesContainer: {
    justifyContent: 'flex-start',
  },
  itemTitle: {},
  itemSubTitle: {},
});

export default forwardRef(Item);
