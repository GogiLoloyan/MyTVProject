import * as React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
  Image,
  TextStyle,
  type StyleProp,
  type ImageSourcePropType,
  type GestureResponderEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Text from '../Typography/Text';
import { forwardRef } from '../../utils/forwardRef';
import { type CardMode, getButtonColors } from './utils';
import { useInternalTheme } from '../../styles/ThemeProvider';
import type { ThemeProp, TypescaleKey } from '../../types';
import { useFocusSystemHandlers } from '../../hooks/useFocusSystemHandlers';

export type Props = {
  /**
   * Mode of the button. You can change the mode to adjust the styling to give it desired emphasis.
   */
  mode?: CardMode;
  /**
   * Aspect ratios
   */
  aspectRatio?: '1 / 1' | '2 / 3' | '16 / 9';
  imageWidth?: number;
  /**
   * Image to display for the `Button background`.
   * It accepts a standard React Native Image `source` prop
   */
  source: ImageSourcePropType;
  /**
   * Text for the title. Note that this will only accept a string or `<Text>`-based node.
   */
  title: React.ReactNode;
  /**
   * Style for the title.
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Number of lines for the title.
   */
  titleNumberOfLines?: number;
  /**
   * Title text variant defines appropriate text styles for type role and its size.
   */
  titleVariant?: keyof typeof TypescaleKey;
  /**
   * Text for the subtitle. Note that this will only accept a string or `<Text>`-based node.
   */
  subtitle?: React.ReactNode;
  /**
   * Style for the subtitle.
   */
  subtitleStyle?: StyleProp<TextStyle>;
  /**
   * Number of lines for the subtitle.
   */
  subtitleNumberOfLines?: number;
  /**
   * Subtitle text variant defines appropriate text styles for type role and its size.
   */
  subtitleVariant?: keyof typeof TypescaleKey;
  /**
   * Text for the description. Note that this will only accept a string or `<Text>`-based node.
   */
  description?: React.ReactNode;
  /**
   * Style for the description.
   */
  descriptionStyle?: StyleProp<TextStyle>;
  /**
   * Number of lines for the description.
   */
  descriptionNumberOfLines?: number;
  /**
   * Description text variant defines appropriate text styles for type role and its size.
   */
  descriptionVariant?: keyof typeof TypescaleKey;
  /**
   * Whether the card is disabled. A disabled card is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
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
 * import { Card } from '@ds/components';
 *
 * const MyComponent = () => (
 *   <Card
 *      mode="..."
 *      title="Title"
 *      subtitle="Sub title"
 *      onPress={() => console.log('Pressed')}
 *      source={require('@/assets/images/example.png')}
 *   />
 * );
 *
 * export default MyComponent;
 * ```
 */
const Card = (
  {
    disabled,
    mode = 'standard',
    aspectRatio = '16 / 9',
    imageWidth = 150,
    source,
    title,
    titleStyle,
    titleNumberOfLines,
    titleVariant = 'titleMedium',
    subtitle,
    subtitleStyle,
    subtitleNumberOfLines,
    subtitleVariant = 'bodySmall',
    description,
    descriptionStyle,
    descriptionNumberOfLines,
    descriptionVariant = 'bodySmall',
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    delayLongPress,
    theme: themeOverrides,
    testID = 'card',
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

  //   const borderRadius = buttonSize / 2;

  const {
    titleColor,
    subtitleColor,
    descriptionColor,
    borderColor,
    backgroundColor,
  } = getButtonColors({
    mode,
    theme,
    disabled,
    focusState,
  });

  const highlightedStyles = {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor,
    borderRadius: mode === 'classic' ? 8 : 12,
    boxShadow:
      focusState === 'focused' && !disabled
        ? '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px 0px rgba(0, 0, 0, 0.3)'
        : '0px 0px 0px 0px rgba(0, 0, 0, 0.15), 0px 0px 0px 0px rgba(0, 0, 0, 0.3)',
  } as StyleProp<ViewStyle>;

  const buttonStyle = {
    // backgroundColor,
  } as StyleProp<ViewStyle>;

  const isHorizontal = mode === 'wide-classic' || mode === 'wide-standard';
  const isInnerHiglighted =
    mode === 'standard' || mode === 'compact' || mode === 'wide-standard';
  const isFullHiglighted = mode === 'classic' || mode === 'wide-classic';

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
      style={styles.card}
      testID={`${testID}-container`}
    >
      <Animated.View
        style={[
          styles.cardContent,
          buttonStyle,
          { transform: [{ scale }] },
          disabled && styles.disabled,
          isHorizontal && styles.cardContentHorizontal,
          isFullHiglighted && highlightedStyles,
        ]}
        testID={`${testID}-content`}
      >
        <View
          style={[
            styles.imageContainer,
            isInnerHiglighted && highlightedStyles,
            { aspectRatio, width: imageWidth },
          ]}
          testID={`${testID}-image-container`}
        >
          <Image
            resizeMode="contain"
            testID={`${testID}-image`}
            source={source}
            style={[
              styles.image,
              isInnerHiglighted && {
                borderRadius: 12,
              },
              { aspectRatio, width: imageWidth },
            ]}
            accessibilityIgnoresInvertColors
          />
          {mode === 'compact' && (
            <LinearGradient
              testID={`${testID}-image-gradient`}
              colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
              locations={[0.1, 1]}
              style={styles.imageLinearGradient}
            />
          )}
        </View>
        <View
          style={[
            styles.contentBlock,
            mode === 'standard'
              ? styles.contentBlockStandart
              : isHorizontal
              ? styles.contentBlockHorizontal
              : styles.contentBlockVertical,
            mode === 'compact' && styles.contentBlockCompact,
            { backgroundColor },
          ]}
          testID={`${testID}-content-block`}
        >
          <Text
            style={[styles.title, { color: titleColor }, titleStyle]}
            numberOfLines={titleNumberOfLines}
            variant={titleVariant}
          >
            {title}
          </Text>

          {subtitle && !disabled && (
            <Text
              style={[styles.subtitle, { color: subtitleColor }, subtitleStyle]}
              numberOfLines={subtitleNumberOfLines}
              variant={subtitleVariant}
            >
              {subtitle}
            </Text>
          )}

          {description && !disabled && (
            <Text
              style={[
                styles.description,
                { color: descriptionColor },
                descriptionStyle,
              ]}
              numberOfLines={descriptionNumberOfLines}
              variant={descriptionVariant}
            >
              {description}
            </Text>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // height: 200,
    // flex: 1,
    // flexShrink: 1,
  },
  cardContent: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContentHorizontal: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
  },
  image: {
    flex: 1,
    height: 'auto',
    width: 'auto',
    // width: '100%',
    // height: undefined,
    // aspectRatio: 1,
    // backgroundColor: 'red',
    // width: undefined,
    // height: '100%',
    // aspectRatio: 1,
    // alignSelf: 'center',
    // flex: 1,
    // width: undefined,
    // height: undefined,
    // width: '100%',
    // height: undefined,
    // aspectRatio: 1,
    // height: '100%',
    // width: '100%',
    objectFit: 'cover',
    resizeMode: 'cover',
    // marginRight: -16.5,
    // opacity: 0.8,
  },
  contentBlock: {
    width: '100%',
    alignItems: 'flex-start',
  },
  contentBlockStandart: {
    marginTop: 8,
    alignItems: 'center',
  },
  contentBlockCompact: {
    position: 'absolute',
    bottom: 0,
  },
  contentBlockVertical: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  contentBlockHorizontal: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  title: {},
  subtitle: {},
  description: {},
  disabled: {
    opacity: 0.6,
  },
  imageLinearGradient: {
    position: 'absolute',
    inset: 0,
    borderRadius: 12,
  },
});

export default forwardRef(Card);
