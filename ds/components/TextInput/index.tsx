import * as React from 'react';
import {
  View,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TextInput as NativeTextInput,
  type StyleProp,
  type TextStyle,
  type TargetedEvent,
  type NativeSyntheticEvent,
  type TextInputSubmitEditingEventData,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import Text from '../Typography/Text';
import type { ThemeProp } from '../../types';
import { forwardRef } from '../../utils/forwardRef';
import { useInternalTheme } from '../../styles/ThemeProvider';
import {
  getTextInputColors,
  type LabelVariant,
  type TextInputVariant,
} from './utils';

export type Props = React.ComponentPropsWithoutRef<typeof NativeTextInput> & {
  /**
   * Variant of the TextInput.
   */
  variant?: TextInputVariant;
  /**
   * If true, user won't be able to interact with the component.
   */
  disabled?: boolean;
  /**
   * The text or component to use for the label.
   */
  label?: string | React.ReactElement;
  /**
   * Label variant.
   */
  labelVariant?: LabelVariant;
  /**
   * Placeholder for the input.
   */
  placeholder?: string;
  /**
   * Supporting text for the input (use for error messages(with hasError props) or for some info text).
   */
  supportingText?: string;
  /**
   * Whether to style the TextInput with error style.
   */
  hasError?: boolean;
  /**
   * Icon to display for the `TextInput`.
   */
  icon?: React.ComponentProps<typeof Icon>['name'];
  /**
   * Icon to display for the front of `TextInput`.
   */
  frontIcon?: React.ComponentProps<typeof Icon>['name'];
  /**
   * Error icon to display for the `TextInput`.
   */
  errorIcon?: React.ComponentProps<typeof Icon>['name'];
  /**
   *  Whether to show error icon or not.
   */
  showErrorIcon?: boolean;
  /**
   * @optional
   */
  theme?: ThemeProp;
  /**
   * testID to be used on tests.
   */
  testID?: string;
};

type TextInputHandles = Pick<
  NativeTextInput,
  'focus' | 'clear' | 'blur' | 'isFocused' | 'setNativeProps'
>;

/**
 * A component to allow users to input text.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { TextInput } from '@ds/components';
 *
 * const MyComponent = () => {
 *   const [text, setText] = React.useState("");
 *
 *   return (
 *     <TextInput
 *       label="Email"
 *       value={text}
 *       onChangeText={text => setText(text)}
 *     />
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 *
 * @extends TextInput props https://reactnative.dev/docs/textinput#props
 */
const TextInput = (
  {
    variant = 'outlined',
    labelVariant = 'aboveInput',
    label,
    icon,
    frontIcon,
    errorIcon,
    showErrorIcon = true,
    placeholder,
    supportingText,
    disabled,
    hasError,
    editable = true,
    theme: themeOverrides,
    testID = 'text-input',
    ...rest
  }: Props,
  ref: React.ForwardedRef<TextInputHandles>
) => {
  const theme = useInternalTheme(themeOverrides);
  const isControlled = rest.value !== undefined;
  const validInputValue = isControlled ? rest.value : rest.defaultValue;
  const originalValue = React.useRef<string | undefined>(validInputValue);

  const [focused, setFocused] = React.useState<boolean>(false);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | undefined
  >(validInputValue);
  // Use value from props instead of local state when input is controlled
  const value = isControlled ? rest.value : uncontrolledValue;

  const root = React.useRef<NativeTextInput>(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => root.current?.focus(),
    clear: () => root.current?.clear(),
    setNativeProps: (args: Object) => root.current?.setNativeProps(args),
    isFocused: () => root.current?.isFocused() || false,
    blur: () => root.current?.blur(),
    forceFocus: () => root.current?.focus(),
  }));

  /**
   * Focus event handler
   */
  const handleFocus = (args: NativeSyntheticEvent<TargetedEvent>) => {
    setFocused(true);
    // @ts-ignore
    rest.onFocus?.(args);
  };

  /**
   * Blur event handler
   */
  const handleBlur = (args: NativeSyntheticEvent<TargetedEvent>) => {
    setFocused(false);
    // @ts-ignore
    rest.onBlur?.(args);
  };

  /**
   * Change event handler
   */
  const handleChangeText = (value: string) => {
    if (!editable || disabled) {
      return;
    }

    if (!isControlled) {
      // Keep track of value in local state when input is not controlled
      setUncontrolledValue(value);
    }
    rest.onChangeText?.(value);
  };

  /**
   * Handle start typing
   */
  const handleStartEditing = () => {
    root.current?.focus();
  };

  /**
   * Handle end(submit) typing
   */
  const handleSubmitEditing = (
    args: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    Keyboard.dismiss();

    // technical debt: input text style is changing after keyboard close when no inital value
    if (!originalValue.current) {
      const text = args.nativeEvent.text;
      if (text !== undefined) {
        handleChangeText(text + ' ');
        setTimeout(() => {
          handleChangeText(text);
        }, 300);
      }
    }
  };

  const { roundness } = theme;
  const borderRadius = 2 * roundness;
  const iconSize = 24;

  const {
    backgroundColor,
    borderColor,
    labelColor,
    inputTextColor,
    supportingTextColor,
  } = getTextInputColors({
    variant,
    theme,
    disabled,
    hasError,
    focused,
    labelVariant,
  });

  const inputStyles = StyleSheet.flatten({
    color: inputTextColor,
    borderRadius,
    backgroundColor,
    borderColor,
    borderStyle: 'solid',
    borderWidth: 1,
    ...theme.fonts.titleMedium,
  } as StyleProp<TextStyle>);

  const hasIcon = Boolean((hasError && showErrorIcon) || icon);
  const hasFrontIcon = Boolean(frontIcon);

  return (
    <TouchableOpacity
      style={[styles.container]}
      activeOpacity={1}
      testID={`${testID}-container`}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPress={handleStartEditing}
    >
      {label && labelVariant === 'aboveInput' && (
        <Text
          variant="labelLarge"
          style={[
            styles.label,
            { color: labelColor },
            disabled && { opacity: 0.4 },
          ]}
          testID={`${testID}-label`}
        >
          {label}
        </Text>
      )}
      <View style={[styles.inputContainer]}>
        <NativeTextInput
          ref={root}
          enterKeyHint="enter"
          underlineColorAndroid="transparent"
          {...rest}
          style={[
            styles.input,
            inputStyles,
            disabled && { opacity: 0.4 },
            hasIcon && { paddingEnd: 8 + iconSize },
            hasFrontIcon && { paddingStart: 8 + iconSize },
            Platform.OS === 'web' && { outline: 'none' },
          ]}
          onSubmitEditing={handleSubmitEditing}
          value={value}
          allowFontScaling={false}
          onChange={(e) => e.preventDefault()}
          onChangeText={handleChangeText}
          editable={!disabled && editable}
          testID={`${testID}-field`}
        />
        {labelVariant === 'insideInput' &&
          (value === '' || value === undefined) && (
            <Text
              variant="titleMedium"
              style={[
                styles.customPlaceholder,
                { color: labelColor },
                hasFrontIcon && { paddingStart: 8 + iconSize },
                disabled && { opacity: 0.4 },
              ]}
              testID={`${testID}-placeholder`}
            >
              {label}
            </Text>
          )}
        {icon && (
          <View style={styles.icon} testID={`${testID}-icon`}>
            <Icon name={icon} size={iconSize} color={inputTextColor} />
          </View>
        )}
        {hasError && showErrorIcon && (
          <View style={styles.icon} testID={`${testID}-icon-error`}>
            <Icon
              name={errorIcon ?? 'alert-circle'}
              size={iconSize}
              color={labelColor}
            />
          </View>
        )}
        {frontIcon && (
          <View style={styles.frontIcon} testID={`${testID}-left-icon`}>
            <Icon name={frontIcon} size={iconSize} color={inputTextColor} />
          </View>
        )}
      </View>
      {supportingText && (
        <Text
          variant="bodySmall"
          style={[
            styles.supportingText,
            { color: supportingTextColor },
            disabled && { opacity: 0.4 },
          ]}
        >
          {supportingText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
    cursor: 'auto',
    backgroundColor: 'transparent',
  },
  label: {
    textAlign: 'left',
  },
  supportingText: {
    textAlign: 'left',
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    margin: 0,
    height: 48,
    paddingHorizontal: Platform.OS === 'web' ? 16 : 0,
    paddingBottom: Platform.OS === 'web' ? 'auto' : 8,
  },
  customPlaceholder: {
    position: 'absolute',
    left: 16,
    top: 12,
  },
  icon: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  frontIcon: {
    position: 'absolute',
    left: 16,
    top: 12,
  },
});

export default forwardRef<TextInputHandles, Props>(TextInput);
