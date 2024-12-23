import * as React from 'react';
import {
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

import type { ThemeProp } from '../../../types';
import { forwardRef } from '../../../utils/forwardRef';
import { splitStyles } from '../../../utils/splitStyles';
import { type TabVariant, getTabColors } from './utils';
import { useInternalTheme } from '../../../styles/ThemeProvider';
import { useFocusSystemHandlers } from '../../../hooks/useFocusSystemHandlers';
import Text from '../../Typography/Text';

export type Props = {
  /**
   * Variant of the tab. You can change the variant to adjust the styling to give it desired emphasis.
   */
  variant?: TabVariant;
  /**
   * Icon to display for the `Tab`.
   */
  icon?: React.ComponentProps<typeof Icon>['name'];
  /**
   * Custom icon's size.
   */
  iconSize?: number;
  /**
   * Whether the tab is disabled. A disabled tab is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Whether the tab is selected.
   */
  selected?: boolean;
  /**
   * Make the label text uppercased. Note that this won't work if you pass React elements as children.
   */
  uppercase?: boolean;
  /**
   * Label text of the tab.
   */
  children?: React.ReactNode;
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
   * Style of tab's inner content.
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
 * A Tab is component that the user can press to trigger an action.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Tab } from '@ds/components';
 *
 * const MyComponent = () => (
 *   <Tab icon="camera" onPress={() => console.log('Pressed')}>
 *     Press me
 *   </Tab>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Tab = (
  {
    disabled,
    selected,
    variant = 'primary',
    icon,
    iconSize: customIconSize,
    children,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    delayLongPress,
    style,
    theme: themeOverrides,
    uppercase = false,
    contentStyle,
    testID = 'tab',
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

  const { backgroundColor, textColor } = getTabColors({
    variant,
    theme,
    disabled,
    focusState,
    selected,
  });

  const tabStyle = {
    // borderColor,
    borderRadius: borderRadiusStyles.borderRadius ?? borderRadius,
    backgroundColor,
  } as StyleProp<ViewStyle>;

  const font = theme.fonts.labelLarge;

  const textStyle = {
    color: textColor,
    ...font,
  } as StyleProp<TextStyle>;

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
    >
      <Animated.View style={[{ transform: [{ scale }] }]}>
        <View style={[styles.tabContent, tabStyle, contentStyle]}>
          {icon && (
            <View
              style={children ? styles.icon : styles.onlyIcon}
              testID={`${testID}-icon-container`}
            >
              <Icon name={icon} size={iconSize} color={textColor} />
            </View>
          )}
          {children && (
            <Text
              variant="titleSmall"
              selectable={false}
              numberOfLines={1}
              testID={`${testID}-label`}
              style={[
                styles.tabLabel,
                textStyle,
                uppercase && styles.uppercaseLabel,
              ]}
              maxFontSizeMultiplier={maxFontSizeMultiplier}
            >
              {children}
            </Text>
          )}
          {variant === 'secondary' &&
            !disabled &&
            (focusState !== 'default' || selected) && (
              <View
                testID={`${testID}-underline`}
                style={{
                  width: focusState !== 'default' ? '100%' : 8,
                  height: 2,
                  backgroundColor: textColor,
                  position: 'absolute',
                  bottom: 0,

                  alignSelf: 'center',
                }}
              />
            )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    height: 32,
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  tabLabel: {
    textAlign: 'center',
  },
  uppercaseLabel: {
    textTransform: 'uppercase',
  },
  icon: {
    marginLeft: -4,
  },
  onlyIcon: {},
});

export default forwardRef(Tab);
