import React, { type PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';

type Props = PropsWithChildren<{}>;

export default function ParallaxScrollView({ children }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const styles = useParallaxScrollViewStyles();

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const useParallaxScrollViewStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    header: {
      height: 125 * scale,
      overflow: 'hidden',
    },
    content: {
      flex: 1,
      backgroundColor: 'black',
      padding: 32 * scale,
      gap: 16 * scale,
      overflow: 'hidden',
    },
  });
};
