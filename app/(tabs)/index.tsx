import React from 'react';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import Button from '@/ds/components/Button';
import IconButton from '@/ds/components/IconButton';
import LongButton from '@/ds/components/LongButton';
import ImageButton from '@/ds/components/ImageButton';
import Card from '@/ds/components/Card';
import Text from '@/ds/components/Typography/Text';

export default function HomeScreen() {
  const styles = useHomeScreenStyles();

  return (
    <ParallaxScrollView>
      <View style={{ backgroundColor: 'black' }}>
        {/*  Button */}
        <ThemedView
          style={{
            ...styles.stepContainer,
            gap: 16,
            padding: 20,
            flexDirection: 'row',
            borderRadius: 16,
          }}
        >
          <ThemedView
            style={{
              ...styles.stepContainer,
              alignItems: 'flex-start',
            }}
          >
            <Button>Button</Button>
            <Button icon="play-outline">Button</Button>
            <Button icon="bookmark-outline">Button</Button>
            <Button disabled>Button</Button>
          </ThemedView>
          <ThemedView
            style={{
              ...styles.stepContainer,
              alignItems: 'flex-start',
            }}
          >
            <Button mode="outlined">Button</Button>
            <Button mode="outlined" icon="play-outline">
              Button
            </Button>
            <Button mode="outlined" icon="bookmark-outline">
              Button
            </Button>
            <Button mode="outlined" disabled>
              Button
            </Button>
          </ThemedView>
        </ThemedView>

        {/* Icon Button */}
        <ThemedView
          style={{
            ...styles.stepContainer,
            padding: 20,
            gap: 16,
            alignItems: 'flex-start',
            flexDirection: 'row',
            borderRadius: 16,
          }}
        >
          <ThemedView
            style={{
              ...styles.stepContainer,
              flexDirection: 'row',
            }}
          >
            <IconButton mode="outlined" icon="plus" size="s" />
            <IconButton mode="outlined" icon="plus" size="m" />
            <IconButton mode="outlined" icon="plus" size="l" />
          </ThemedView>
          <ThemedView
            style={{
              ...styles.stepContainer,
              flexDirection: 'row',
            }}
          >
            <IconButton disabled mode="outlined" icon="plus" size="s" />
            <IconButton disabled mode="outlined" icon="plus" size="m" />
            <IconButton disabled mode="outlined" icon="plus" size="l" />
          </ThemedView>
        </ThemedView>

        {/* Icon Button */}
        <ThemedView
          style={{
            ...styles.stepContainer,
            gap: 16,
            padding: 20,
            alignItems: 'flex-start',
            flexDirection: 'row',
            borderRadius: 16,
          }}
        >
          <ThemedView
            style={{
              ...styles.stepContainer,
              flexDirection: 'row',
            }}
          >
            <IconButton icon="plus" size="s" />
            <IconButton icon="plus" size="m" />
            <IconButton icon="plus" size="l" />
          </ThemedView>
          <ThemedView
            style={{
              ...styles.stepContainer,
              flexDirection: 'row',
            }}
          >
            <IconButton disabled icon="plus" size="s" />
            <IconButton disabled icon="plus" size="m" />
            <IconButton disabled icon="plus" size="l" />
          </ThemedView>
        </ThemedView>

        {/* Long Button */}
        <ThemedView
          style={{
            ...styles.stepContainer,
            padding: 20,
            gap: 16,
            borderRadius: 16,
            flexDirection: 'row',
          }}
        >
          <ThemedView
            style={{
              ...styles.stepContainer,
              alignItems: 'flex-start',
              width: 300,
            }}
          >
            <LongButton icon="plus" subLabel="Subtitle">
              Title
            </LongButton>
            <LongButton icon="plus">Title</LongButton>
          </ThemedView>
        </ThemedView>

        {/* Image Button */}
        <ThemedView
          style={{
            ...styles.stepContainer,
            padding: 20,
            gap: 16,
            borderRadius: 16,
            flexDirection: 'row',
          }}
        >
          <ThemedView
            style={{
              ...styles.stepContainer,
              alignItems: 'flex-start',
              width: 200,
            }}
          >
            <ImageButton
              icon="plus"
              source={require('@/assets/images/example.png')}
              subLabel="Subtitle"
            >
              Title
            </ImageButton>
            <ImageButton
              icon="plus"
              source={require('@/assets/images/example.png')}
            >
              Title
            </ImageButton>
          </ThemedView>
        </ThemedView>

        {/* Card */}
        <ThemedView
          style={{
            ...styles.stepContainer,
            padding: 20,
            gap: 16,
            borderRadius: 16,
            flexDirection: 'row',
          }}
        >
          <ThemedView
            style={{
              ...styles.stepContainer,
              alignItems: 'flex-start',
              width: 200,
            }}
          >
            <Text>Standat</Text>
            <ThemedView
              style={{
                ...styles.stepContainer,
                gap: 16,
                padding: 20,
                flexDirection: 'row',
                borderRadius: 16,
              }}
            >
              <Card
                source={require('@/assets/images/example.png')}
                title="Title"
                subtitle="Secondary • text"
              />
              <Card
                disabled
                source={require('@/assets/images/example.png')}
                title="Title"
                subtitle="Secondary • text"
              />
            </ThemedView>

            <Text>Classic</Text>
            <ThemedView
              style={{
                ...styles.stepContainer,
                gap: 16,
                padding: 20,
                flexDirection: 'row',
                borderRadius: 16,
              }}
            >
              <Card
                mode="classic"
                source={require('@/assets/images/example.png')}
                title="Title"
                subtitle="Secondary • text"
              />
              <Card
                disabled
                mode="classic"
                source={require('@/assets/images/example.png')}
                title="Title"
                subtitle="Secondary • text"
              />
            </ThemedView>

            <Text>Compact</Text>
            <ThemedView
              style={{
                ...styles.stepContainer,
                gap: 32,
                padding: 20,
                flexDirection: 'row',
                borderRadius: 16,
              }}
            >
              <Card
                mode="compact"
                source={require('@/assets/images/example.png')}
                title="Title"
                subtitle="Secondary • text"
              />
              <Card
                disabled
                mode="compact"
                source={require('@/assets/images/example.png')}
                title="Title"
                subtitle="Secondary • text"
              />
            </ThemedView>

            <Text>Wide standard</Text>
            <ThemedView
              style={{
                ...styles.stepContainer,
                gap: 32,
                padding: 20,
                flexDirection: 'row',
                borderRadius: 16,
              }}
            >
              <Card
                mode="wide-standard"
                source={require('@/assets/images/example.png')}
                title="Title"
                subtitle="Secondary • text"
              />
              <Card
                disabled
                mode="wide-standard"
                source={require('@/assets/images/example.png')}
                title="Title"
                subtitle="Secondary • text"
              />
            </ThemedView>

            <Text>Wide classic</Text>
            <ThemedView
              style={{
                ...styles.stepContainer,
                gap: 32,
                padding: 20,
                flexDirection: 'row',
                borderRadius: 16,
                width: 300,
              }}
            >
              <Card
                aspectRatio="1 / 1"
                mode="wide-classic"
                source={require('@/assets/images/example.png')}
                title="Title"
                subtitle="Secondary • text"
                description="Some description"
              />
              <Card
                mode="wide-classic"
                source={require('@/assets/images/example.png')}
                title="Title"
                subtitle="Secondary • text"
                description="Some description"
              />
              <Card
                disabled
                mode="wide-classic"
                source={require('@/assets/images/example.png')}
                title="Title"
                subtitle="Secondary • text"
                description="Some description"
              />
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView
          style={{
            ...styles.stepContainer,
            padding: 20,
            gap: 16,
            borderRadius: 16,
          }}
        >
          <ThemedView
            style={{
              ...styles.stepContainer,
              alignItems: 'flex-start',
              width: 200,
            }}
          />
        </ThemedView>
      </View>
    </ParallaxScrollView>
  );
}

const useHomeScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8 * scale,
    },
    stepContainer: {
      gap: 8 * scale,
      marginBottom: 8 * scale,
      backgroundColor: '#1F1F1F',
    },
    reactLogo: {
      height: 178 * scale,
      width: 290 * scale,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
  });
};
