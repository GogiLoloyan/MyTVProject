import React from 'react';
import {
  Animated,
  TouchableOpacityProps,
  type NativeSyntheticEvent,
  type TargetedEvent,
  type GestureResponderEvent,
} from 'react-native';

export type FocusState = 'default' | 'focused' | 'pressed';

type Props = {
  disabled?: boolean;
  onPressIn?: TouchableOpacityProps['onPressIn'];
  onPressOut?: TouchableOpacityProps['onPressOut'];
  onFocus?: TouchableOpacityProps['onFocus'];
  onBlur?: TouchableOpacityProps['onBlur'];
};

export const useFocusSystemHandlers = ({
  disabled,
  onBlur,
  onFocus,
  onPressIn,
  onPressOut,
}: Props) => {
  const [focusState, setFocusState] = React.useState<FocusState>('default');

  const { current: scale } = React.useRef<Animated.Value>(
    new Animated.Value(1)
  );

  /**
   * Handle focus event to scale the element up
   */
  const handleFocus = (event: NativeSyntheticEvent<TargetedEvent>) => {
    setFocusState('focused');
    onFocus?.(event);
    if (disabled) {
      return;
    }
    Animated.spring(scale, {
      toValue: 1.1,
      friction: 9,
      tension: 100,
      useNativeDriver: false,
    }).start();
  };

  /**
   * Handle blur event to scale the element back to normal
   */
  const handleBlur = (event: NativeSyntheticEvent<TargetedEvent>) => {
    setFocusState('default');
    onBlur?.(event);
    if (disabled) {
      return;
    }
    Animated.spring(scale, {
      toValue: 1,
      friction: 9,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Handle press in event to scale down the element when pressed
   */
  const handlePressIn = (event: GestureResponderEvent) => {
    setFocusState('pressed');
    onPressIn?.(event);
    if (disabled) {
      return;
    }
    Animated.spring(scale, {
      toValue: 1,
      friction: 9,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Handle press out event to scale back up when the element is released
   */
  const handlePressOut = (event: GestureResponderEvent) => {
    setFocusState((prev) => (prev === 'pressed' ? 'focused' : 'default'));
    onPressOut?.(event);
    if (disabled) {
      return;
    }
    Animated.spring(scale, {
      toValue: 1.1,
      friction: 9,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return {
    scale,
    focusState,
    handleFocus,
    handleBlur,
    handlePressIn,
    handlePressOut,
  };
};
