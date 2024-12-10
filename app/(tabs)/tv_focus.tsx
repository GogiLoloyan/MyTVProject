import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { EventHandlingDemo } from '@/components/EventHandlingDemo';
import { useScale } from '@/hooks/useScale';

export default function FocusDemoScreen() {
  const styles = useFocusDemoScreenStyles();
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">TV event handling demo</ThemedText>
      </ThemedView>
      <ThemedText>
        Demo of focus handling and TV remote event handling in{' '}
        <ThemedText type="defaultSemiBold">Pressable</ThemedText> and{' '}
        <ThemedText type="defaultSemiBold">Touchable</ThemedText> components.
      </ThemedText>
      <Collapsible title="How it works">
        <ThemedText>
          • On TV platforms, these components have "onFocus()" and "onBlur()"
          props, in addition to the usual "onPress()". These can be used to
          modify the style of the component when it is navigated to or navigated
          away from by the TV focus engine.
        </ThemedText>
        <ThemedText>
          • In addition, the functional forms of the Pressable style prop and
          the Pressable content, which in React Native core take a "pressed"
          boolean parameter, can also take "focused" as a parameter on TV
          platforms.
        </ThemedText>
        <ThemedText>
          • As you use the arrow keys to navigate around the screen, the demo
          uses the above props to update lists of recent events.
        </ThemedText>
        <ThemedText>
          In RNTV 0.76, `Pressable` and `Touchable` components receive "focus",
          "blur", "pressIn", and "pressOut" events directly from native code,
          for improved performance when navigating around the screen.
        </ThemedText>
      </Collapsible>
      {Platform.isTV ? (
        <EventHandlingDemo />
      ) : (
        <ThemedText>
          Run this on Apple TV or Android TV to see the demo.
        </ThemedText>
      )}
    </ParallaxScrollView>
  );
}

const useFocusDemoScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    headerImage: {
      color: '#808080',
      bottom: -45 * scale,
      left: 0,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale,
    },
  });
};