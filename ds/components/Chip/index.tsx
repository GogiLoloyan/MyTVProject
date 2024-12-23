import * as React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
  type ImageSourcePropType,
  type GestureResponderEvent,
  ImageBackground,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import type { ThemeProp } from '../../types';
import Text from '../Typography/Text';
import { forwardRef } from '../../utils/forwardRef';
import { splitStyles } from '../../utils/splitStyles';
import { type ChipBorderStyle, getChipColors } from './utils';
import { useInternalTheme } from '../../styles/ThemeProvider';
import { useFocusSystemHandlers } from '../../hooks/useFocusSystemHandlers';

export type Props = {
  /**
   * Style of the chip border.
   */
  borderStyle?: ChipBorderStyle;
  /**
   * Active chip or inactive
   */
  active?: boolean;
  /**
   * Leading icon to display for the `Chip`.
   */
  leadingIcon?: React.ComponentProps<typeof Icon>['name'];
  /**
   * Trailing icon to display for the `Chip`.
   */
  trailingIcon?: React.ComponentProps<typeof Icon>['name'];
  /**
   * Custom icon's size.
   */
  iconSize?: number;
  /**
   * Image to display as leading Icon.
   * It accepts a standard React Native Image `source` prop
   */
  imageSource?: ImageSourcePropType;
  /**
   * Whether the chip is disabled. A disabled chip is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Whether the chip is selected.
   */
  selected?: boolean;
  /**
   * Make the label text uppercased. Note that this won't work if you pass React elements as children.
   */
  uppercase?: boolean;
  /**
   * Label text of the chip.
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
   * Style of chip's inner content.
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
 * A Chip is component that the user can press to trigger an action.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Chip } from '@ds/components';
 *
 * const MyComponent = () => (
 *   <Chip trailingIcon="camera" onPress={() => console.log('Pressed')}>
 *     Press me
 *   </Chip>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Chip = (
  {
    active,
    disabled,
    selected,
    borderStyle = 'squared',
    leadingIcon,
    trailingIcon,
    iconSize: customIconSize,
    imageSource,
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
    testID = 'chip',
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

  const borderRadius = (imageSource ? 9 : 2) * roundness;
  const iconSize = customIconSize ?? 18;

  const {
    textColor,
    borderColor,
    backgroundColor,
    imageIconColor,
    imageBackground,
  } = getChipColors({
    theme,
    disabled,
    focusState,
    selected,
    active,
  });

  const chipStyle = {
    borderColor,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: borderRadiusStyles.borderRadius ?? borderRadius,
    backgroundColor,
  } as StyleProp<ViewStyle>;

  const textStyle = {
    color: textColor,
    ...theme.fonts.labelLarge,
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
        <View style={[styles.chipContent, chipStyle, contentStyle]}>
          {imageSource && (
            <View
              style={[
                styles.imageContainer,
                { backgroundColor: imageBackground },
              ]}
            >
              {selected ? (
                <Icon name="check" size={iconSize} color={imageIconColor} />
              ) : (
                <ImageBackground
                  resizeMode="cover"
                  borderRadius={1000}
                  testID={`${testID}-image`}
                  source={imageSource}
                  style={[styles.image]}
                  accessibilityIgnoresInvertColors
                />
              )}
            </View>
          )}
          {leadingIcon && (
            <View style={styles.leadingIcon} testID={`${testID}-leading-icon`}>
              <Icon name={leadingIcon} size={iconSize} color={textColor} />
            </View>
          )}
          {children && (
            <Text
              variant="labelLarge"
              selectable={false}
              numberOfLines={1}
              testID={`${testID}-label`}
              style={[
                styles.chipLabel,
                textStyle,
                uppercase && styles.uppercaseLabel,
              ]}
              maxFontSizeMultiplier={maxFontSizeMultiplier}
            >
              {children}
            </Text>
          )}
          {trailingIcon && (
            <View
              style={styles.trailingIcon}
              testID={`${testID}-trailing-icon`}
            >
              <Icon name={trailingIcon} size={iconSize} color={textColor} />
            </View>
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
  chipContent: {
    height: 36,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  chipLabel: {
    textAlign: 'center',
  },
  uppercaseLabel: {
    textTransform: 'uppercase',
  },
  leadingIcon: {
    marginLeft: -6,
  },
  trailingIcon: {
    marginRight: -6,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 28,
    marginLeft: -12,
  },
  image: {
    width: 28,
    height: 28,
  },
});

export default forwardRef(Chip);
