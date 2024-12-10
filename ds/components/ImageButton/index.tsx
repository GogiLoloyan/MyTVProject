import * as React from 'react';
import {
  AccessibilityRole,
  Animated,
  GestureResponderEvent,
  StyleSheet,
  View,
  Image,
  ViewStyle,
  TouchableOpacity,
  type StyleProp,
  type ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import Text from '../Typography/Text';
import { getButtonColors } from './utils';
import { useInternalTheme } from '../../styles/ThemeProvider';
import type { ThemeProp } from '../../types';
import { forwardRef } from '../../utils/forwardRef';
import { splitStyles } from '../../utils/splitStyles';
import { useFocusSystemHandlers } from '../../hooks/useFocusSystemHandlers';

export type Props = {
  /**
   * Image to display for the `Image button background`.
   * It accepts a standard React Native Image `source` prop
   */
  source: ImageSourcePropType;
  /**
   * Icon to display for the `Image button`.
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
   * Sub label text of the button.
   */
  subLabel?: React.ReactNode;
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
 * import { ImageButton } from '@ds/components';
 *
 * const MyComponent = () => (
 *   <ImageButton
 *      icon="plus"
 *      source={require('@/assets/images/example.png')}
 *      onPress={() => console.log('Pressed')}
 *      subLabel="Subtitle"
 *   >
 *     Title
 *   </Button>
 * );
 *
 * export default MyComponent;
 * ```
 */
const ImageButton = (
  {
    source,
    disabled,
    icon,
    iconSize: customIconSize,
    children,
    subLabel,
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
    testID = 'image-button',
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
  });

  const { roundness } = theme;

  const flattenedStyles = (StyleSheet.flatten(style) || {}) as ViewStyle;
  const [, borderRadiusStyles] = splitStyles(
    flattenedStyles,
    (style) => style.startsWith('border') && style.endsWith('Radius')
  );

  const borderRadius = 3 * roundness;
  const iconSize = customIconSize ?? 20;

  const {
    backgroundColor,
    textColor,
    subTextColor,
    linearGradient,
    scrimColor,
    borderColor,
  } = getButtonColors({
    theme,
    focusState,
  });

  const buttonStyle = {
    borderColor,
    borderRadius: borderRadiusStyles.borderRadius ?? borderRadius,
    backgroundColor,
  } as StyleProp<ViewStyle>;

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
      style={styles.button}
      testID={`${testID}-container`}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
    >
      <Animated.View
        style={[
          styles.buttonContent,
          buttonStyle,
          contentStyle,
          { transform: [{ scale }] },
        ]}
      >
        <View
          testID={`${testID}-image-container`}
          style={[styles.imageContainer, { backgroundColor }]}
        >
          <Image
            testID={`${testID}-image`}
            source={source}
            style={styles.image}
            accessibilityIgnoresInvertColors
          />
          <View
            testID={`${testID}-image-scrim`}
            style={[styles.imageScrim, { backgroundColor: scrimColor }]}
          />
          <LinearGradient
            testID={`${testID}-image-gradient`}
            colors={linearGradient}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            locations={[0.2, 1]}
            style={styles.imageLinearGradient}
          />
        </View>
        {icon && (
          <View style={iconStyle} testID={`${testID}-icon-container`}>
            <Icon name={icon} size={iconSize} color={textColor} />
          </View>
        )}
        <View style={styles.labelsContainer}>
          <Text
            variant="titleMedium"
            selectable={false}
            numberOfLines={1}
            testID={`${testID}-label`}
            style={[
              styles.buttonLabel,
              { color: textColor },
              uppercase && styles.uppercaseLabel,
            ]}
            maxFontSizeMultiplier={maxFontSizeMultiplier}
          >
            {children}
          </Text>
          {subLabel && (
            <Text
              variant="bodySmall"
              selectable={false}
              numberOfLines={1}
              testID={`${testID}-sub-label`}
              style={[
                styles.buttonSubLabel,
                uppercase && styles.uppercaseLabel,
                { color: subTextColor },
              ]}
              maxFontSizeMultiplier={maxFontSizeMultiplier}
            >
              {subLabel}
            </Text>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexShrink: 1,
    width: '100%',
  },
  buttonContent: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  labelsContainer: {
    elevation: 1,
    justifyContent: 'flex-start',
  },
  buttonLabel: {},
  uppercaseLabel: {
    textTransform: 'uppercase',
  },
  buttonSubLabel: {},
  icon: {
    marginRight: 12,
  },
  iconReverse: {
    marginLeft: 12,
  },
  imageContainer: {
    position: 'absolute',
    inset: -2,
  },
  imageLinearGradient: {
    position: 'absolute',
    inset: 0,
  },
  imageScrim: {
    position: 'absolute',
    inset: 0,
  },
  image: {
    height: '100%',
    objectFit: 'contain',
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    marginRight: -16.5,
    opacity: 0.8,
  },
});

export default forwardRef(ImageButton);
