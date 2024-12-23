import React, { useState } from 'react';
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
import List from '@/ds/components/List';
// import Modal from '@/ds/components/Modal';
// import Portal from '@/ds/components/Portal/Portal';
import PortalHost from '@/ds/components/Portal/PortalHost';
import Tabs from '@/ds/components/Tabs';
import Tag from '@/ds/components/Tag';
import Pagination from '@/ds/components/Pagination';
import ProgressBar from '@/ds/components/ProgressBar';
import IconFrame from '@/ds/components/IconFrame';
import { Colors } from '@/ds/styles/themes/tokens';
import TextInput from '@/ds/components/TextInput';
import Chip from '@/ds/components/Chip';
import DialogsExamples from '@/components/DialogsExamples';

export default function HomeScreen() {
  const styles = useHomeScreenStyles();
  const [selected, setSelected] = useState(1);

  const [text, setText] = React.useState('Hi');

  return (
    <ParallaxScrollView>
      <PortalHost>
        <View style={{ backgroundColor: 'black' }}>
          {/* TextInput */}
          <ThemedView
            style={{
              ...styles.stepContainer,
              padding: 20,
              gap: 16,
              borderRadius: 16,
            }}
          >
            <Text variant="displaySmall">Text Inputs</Text>
            <ThemedView
              style={{
                ...styles.stepContainer,
                padding: 20,
                gap: 32,
                borderRadius: 16,
                flexDirection: 'row',
              }}
            >
              <ThemedView
                style={{
                  ...styles.stepContainer,
                  // alignItems: 'flex-start',
                  gap: 16,
                  width: 300,
                }}
              >
                <TextInput
                  value={text}
                  label="Label"
                  onChangeText={(text) => setText(text)}
                  supportingText="Supporting text"
                />
                <TextInput
                  label="Label"
                  labelVariant="insideInput"
                  supportingText="Supporting text"
                />
                <TextInput
                  frontIcon="pencil"
                  value={text}
                  label="Label"
                  onChangeText={(text) => setText(text)}
                  supportingText="Supporting text"
                />
                <TextInput
                  frontIcon="pencil"
                  label="Label"
                  labelVariant="insideInput"
                  supportingText="Supporting text"
                />
                <TextInput
                  hasError
                  label="Label"
                  supportingText="Supporting text"
                />
                <TextInput
                  hasError
                  label="Label"
                  labelVariant="insideInput"
                  supportingText="Supporting text"
                />
                <TextInput
                  frontIcon="pencil"
                  hasError
                  label="Label"
                  labelVariant="insideInput"
                  supportingText="Supporting text"
                />
                <TextInput
                  disabled
                  label="Label"
                  labelVariant="insideInput"
                  supportingText="Supporting text"
                />
              </ThemedView>
              <ThemedView
                style={{
                  ...styles.stepContainer,
                  gap: 16,
                  width: 300,
                }}
              >
                <TextInput
                  variant="filled"
                  label="Label"
                  supportingText="Supporting text"
                />
                <TextInput
                  variant="filled"
                  label="Label"
                  labelVariant="insideInput"
                  supportingText="Supporting text"
                />
                <TextInput
                  frontIcon="email-edit"
                  variant="filled"
                  label="Label"
                  supportingText="Supporting text"
                />
                <TextInput
                  frontIcon="email-edit"
                  variant="filled"
                  label="Label"
                  labelVariant="insideInput"
                  supportingText="Supporting text"
                />
                <TextInput
                  hasError
                  variant="filled"
                  label="Label"
                  supportingText="Supporting text"
                />
                <TextInput
                  hasError
                  variant="filled"
                  label="Label"
                  labelVariant="insideInput"
                  supportingText="Supporting text"
                />
                <TextInput
                  hasError
                  frontIcon="email-edit"
                  variant="filled"
                  label="Label"
                  labelVariant="insideInput"
                  supportingText="Supporting text"
                />
                <TextInput
                  disabled
                  variant="filled"
                  label="Label"
                  labelVariant="insideInput"
                  supportingText="Supporting text"
                />
              </ThemedView>
            </ThemedView>
          </ThemedView>

          {/* Chips */}
          <ThemedView
            style={{
              ...styles.stepContainer,
              padding: 20,
              gap: 16,
              borderRadius: 16,
            }}
          >
            <Text variant="displaySmall">Chips</Text>
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
                  alignItems: 'center',
                }}
              >
                <Chip>Label</Chip>
                <Chip trailingIcon="close">Label</Chip>
                <Chip leadingIcon="check">Label</Chip>
                <Chip leadingIcon="check" trailingIcon="close">
                  Label
                </Chip>
                <Chip imageSource={require('@/assets/images/background.png')}>
                  Image
                </Chip>
                <Chip
                  trailingIcon="close"
                  imageSource={require('@/assets/images/background.png')}
                >
                  Image
                </Chip>
                <Chip selected>Label</Chip>
                <Chip selected trailingIcon="close">
                  Label
                </Chip>
                <Chip selected leadingIcon="check">
                  Label
                </Chip>
                <Chip selected leadingIcon="check" trailingIcon="close">
                  Label
                </Chip>
                <Chip
                  selected
                  imageSource={require('@/assets/images/background.png')}
                >
                  Image
                </Chip>
                <Chip
                  selected
                  trailingIcon="close"
                  imageSource={require('@/assets/images/background.png')}
                >
                  Image
                </Chip>
              </ThemedView>
              <ThemedView
                style={{
                  ...styles.stepContainer,
                  alignItems: 'center',
                }}
              >
                <Chip active>Label</Chip>
                <Chip active trailingIcon="close">
                  Label
                </Chip>
                <Chip active leadingIcon="check">
                  Label
                </Chip>
                <Chip active leadingIcon="check" trailingIcon="close">
                  Label
                </Chip>
                <Chip
                  active
                  imageSource={require('@/assets/images/background.png')}
                >
                  Image
                </Chip>
                <Chip
                  active
                  trailingIcon="close"
                  imageSource={require('@/assets/images/background.png')}
                >
                  Image
                </Chip>

                <Chip selected active>
                  Label
                </Chip>
                <Chip selected active trailingIcon="close">
                  Label
                </Chip>
                <Chip selected active leadingIcon="check">
                  Label
                </Chip>
                <Chip selected active leadingIcon="check" trailingIcon="close">
                  Label
                </Chip>
                <Chip
                  selected
                  active
                  imageSource={require('@/assets/images/background.png')}
                >
                  Image
                </Chip>
                <Chip
                  selected
                  active
                  trailingIcon="close"
                  imageSource={require('@/assets/images/background.png')}
                >
                  Image
                </Chip>
              </ThemedView>

              <ThemedView
                style={{
                  ...styles.stepContainer,
                  alignItems: 'center',
                }}
              >
                <Chip disabled>Label</Chip>
                <Chip disabled trailingIcon="close">
                  Label
                </Chip>
                <Chip disabled leadingIcon="check">
                  Label
                </Chip>
                <Chip disabled leadingIcon="check" trailingIcon="close">
                  Label
                </Chip>
                <Chip
                  disabled
                  imageSource={require('@/assets/images/background.png')}
                >
                  Image
                </Chip>
                <Chip
                  disabled
                  trailingIcon="close"
                  imageSource={require('@/assets/images/background.png')}
                >
                  Image
                </Chip>

                <Chip selected disabled>
                  Label
                </Chip>
                <Chip selected disabled trailingIcon="close">
                  Label
                </Chip>
                <Chip selected disabled leadingIcon="check">
                  Label
                </Chip>
                <Chip
                  selected
                  disabled
                  leadingIcon="check"
                  trailingIcon="close"
                >
                  Label
                </Chip>
                <Chip selected disabled>
                  Image
                </Chip>
                <Chip selected disabled trailingIcon="close">
                  Image
                </Chip>
              </ThemedView>
              <ThemedView
                style={{
                  ...styles.stepContainer,
                  alignItems: 'center',
                }}
              >
                <Chip disabled active>
                  Label
                </Chip>
                <Chip disabled active trailingIcon="close">
                  Label
                </Chip>
                <Chip disabled active leadingIcon="check">
                  Label
                </Chip>
                <Chip disabled active leadingIcon="check" trailingIcon="close">
                  Label
                </Chip>
                <Chip
                  disabled
                  active
                  imageSource={require('@/assets/images/background.png')}
                >
                  Image
                </Chip>
                <Chip
                  disabled
                  active
                  trailingIcon="close"
                  imageSource={require('@/assets/images/background.png')}
                >
                  Image
                </Chip>

                <Chip selected disabled active>
                  Label
                </Chip>
                <Chip selected disabled active trailingIcon="close">
                  Label
                </Chip>
                <Chip selected disabled active leadingIcon="check">
                  Label
                </Chip>
                <Chip
                  selected
                  disabled
                  active
                  leadingIcon="check"
                  trailingIcon="close"
                >
                  Label
                </Chip>
                <Chip
                  selected
                  disabled
                  active
                  imageSource={require('@/assets/images/background.png')}
                >
                  Image
                </Chip>
                <Chip
                  selected
                  disabled
                  active
                  trailingIcon="close"
                  imageSource={require('@/assets/images/background.png')}
                >
                  Image
                </Chip>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          {/* List */}
          <ThemedView
            style={{
              ...styles.stepContainer,
              gap: 16,
              padding: 20,
              borderRadius: 16,
            }}
          >
            <Text variant="displaySmall">Lists</Text>
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
                <List>
                  <List.Item icon="play-circle">Title</List.Item>
                  <List.Item icon="play-circle" selected>
                    Title
                  </List.Item>
                  <List.Item icon="play-circle">Title</List.Item>
                  <List.Item disabled icon="play-circle">
                    Title
                  </List.Item>
                </List>
              </ThemedView>
              <ThemedView
                style={{
                  ...styles.stepContainer,
                  flexDirection: 'row',
                }}
              >
                <List>
                  <List.Item
                    selected={selected === 1}
                    icon="play-circle"
                    subTitle="Subtitle"
                    onPress={() => setSelected(1)}
                  >
                    Title
                  </List.Item>
                  <List.Item
                    selected={selected === 2}
                    icon="play-circle"
                    subTitle="Subtitle"
                    onPress={() => setSelected(2)}
                  >
                    Title
                  </List.Item>
                  <List.Item
                    selected={selected === 3}
                    icon="play-circle"
                    subTitle="Subtitle"
                    onPress={() => setSelected(3)}
                  >
                    Title
                  </List.Item>
                  <List.Item
                    disabled
                    selected={selected === 4}
                    icon="play-circle"
                    subTitle="Subtitle"
                    onPress={() => setSelected(3)}
                  >
                    Title
                  </List.Item>
                </List>
              </ThemedView>
              <ThemedView
                style={{
                  ...styles.stepContainer,
                  flexDirection: 'row',
                }}
              >
                <List>
                  <List.Item
                    icon="account-circle-outline"
                    subTitle="jake.fear.tv@gmail.com"
                    overlineText="Personal"
                  >
                    Accounts
                  </List.Item>
                  <List.Item
                    selected
                    icon="alert-circle-outline"
                    subTitle="App - v1.8"
                    overlineText="Information"
                  >
                    About
                  </List.Item>
                  <List.Item
                    icon="web"
                    subTitle="Preference"
                    overlineText="English (United Kingdom)"
                  >
                    Language
                  </List.Item>
                  <List.Item
                    disabled
                    icon="web"
                    subTitle="Preference"
                    overlineText="English (United Kingdom)"
                  >
                    Language
                  </List.Item>
                </List>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          {/*  Tabs */}
          <ThemedView
            style={{
              ...styles.stepContainer,
              gap: 16,
              padding: 20,
              borderRadius: 16,
            }}
          >
            <Text variant="displaySmall">Tabs</Text>
            <Tabs>
              <Tabs.Tab variant="secondary" icon="magnify" selected />
              <Tabs.Tab variant="secondary" icon="home-outline" />
              <Tabs.Tab variant="secondary" icon="movie-outline" />
              <Tabs.Tab variant="secondary" icon="television" />
              <Tabs.Tab variant="secondary" disabled icon="folder-outline" />
            </Tabs>
            <Tabs>
              <Tabs.Tab selected>Search</Tabs.Tab>
              <Tabs.Tab>Home</Tabs.Tab>
              <Tabs.Tab>Movies</Tabs.Tab>
              <Tabs.Tab>Shows</Tabs.Tab>
              <Tabs.Tab disabled>Library</Tabs.Tab>
            </Tabs>
            <Tabs>
              <Tabs.Tab icon="magnify" selected>
                Search
              </Tabs.Tab>
              <Tabs.Tab icon="home-outline">Home</Tabs.Tab>
              <Tabs.Tab icon="movie-outline">Movies</Tabs.Tab>
              <Tabs.Tab icon="television">Shows</Tabs.Tab>
              <Tabs.Tab disabled icon="folder-outline">
                Library
              </Tabs.Tab>
            </Tabs>
            <Tabs>
              <Tabs.Tab variant="secondary" icon="magnify" selected>
                Search
              </Tabs.Tab>
              <Tabs.Tab variant="secondary" icon="home-outline">
                Home
              </Tabs.Tab>
              <Tabs.Tab variant="secondary" icon="movie-outline">
                Movies
              </Tabs.Tab>
              <Tabs.Tab variant="secondary" icon="television">
                Shows
              </Tabs.Tab>
              <Tabs.Tab variant="secondary" disabled icon="folder-outline">
                Library
              </Tabs.Tab>
            </Tabs>
          </ThemedView>

          {/* Primitives */}
          <ThemedView
            style={{
              ...styles.stepContainer,
              gap: 16,
              padding: 20,
              borderRadius: 16,
            }}
          >
            <Text variant="displaySmall">Primitives</Text>
            <ThemedView
              style={{
                ...styles.stepContainer,
                gap: 32,
                flexDirection: 'row',
              }}
            >
              <Text variant="bodyLarge">Tags</Text>
              <ThemedView
                style={{
                  ...styles.stepContainer,
                  gap: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Tag>Label</Tag>
                <Tag size="large">Label</Tag>
                <Tag variant="outlined">Label</Tag>
                <Tag variant="outlined" size="large">
                  Label
                </Tag>
              </ThemedView>
            </ThemedView>
            <ThemedView
              style={{
                ...styles.stepContainer,
                gap: 32,
                flexDirection: 'row',
              }}
            >
              <Text variant="bodyLarge">Pagination</Text>
              <ThemedView
                style={{
                  ...styles.stepContainer,
                  gap: 16,
                  alignItems: 'center',
                }}
              >
                <Pagination pageCount={8} currentPage={1} />
                <Pagination pageCount={8} currentPage={2} />
                <Pagination pageCount={8} currentPage={3} />
                <Pagination pageCount={8} currentPage={4} />
              </ThemedView>
              <ThemedView
                style={{
                  ...styles.stepContainer,
                  gap: 16,
                  alignItems: 'center',
                }}
              >
                <Pagination
                  variant="with-background"
                  pageCount={8}
                  currentPage={5}
                />
                <Pagination
                  variant="with-background"
                  pageCount={8}
                  currentPage={6}
                />
                <Pagination
                  variant="with-background"
                  pageCount={8}
                  currentPage={7}
                />
                <Pagination
                  variant="with-background"
                  pageCount={8}
                  currentPage={8}
                />
              </ThemedView>
            </ThemedView>
            <ThemedView
              style={{
                ...styles.stepContainer,
                gap: 32,
                flexDirection: 'row',
              }}
            >
              <Text variant="bodyLarge">Progress bar</Text>
              <ThemedView
                style={{
                  ...styles.stepContainer,
                  gap: 16,
                  alignItems: 'center',
                  width: 300,
                }}
              >
                <ProgressBar progress={20} />
                <ProgressBar progress={40} />
                <ProgressBar progress={60} />
                <ProgressBar progress={80} />
                <ProgressBar progress={100} />
              </ThemedView>
            </ThemedView>
            <ThemedView
              style={{
                ...styles.stepContainer,
                gap: 32,
                flexDirection: 'row',
              }}
            >
              <Text variant="bodyLarge">Icon frame</Text>
              <ThemedView
                style={{
                  ...styles.stepContainer,
                  gap: 16,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <IconFrame size="xs" icon="play" />
                <IconFrame size="s" icon="play" />
                <IconFrame size="m" icon="play" />
                <IconFrame size="l" icon="pause" />
                <IconFrame size="xl" icon="play" />
              </ThemedView>
            </ThemedView>
          </ThemedView>

          {/*  Button */}
          <ThemedView
            style={{
              ...styles.stepContainer,
              gap: 16,
              padding: 20,
              borderRadius: 16,
            }}
          >
            <Text variant="displaySmall">Buttons</Text>
            <ThemedView
              style={{
                ...styles.stepContainer,
                gap: 32,
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
                <Button variant="outlined">Button</Button>
                <Button variant="outlined" icon="play-outline">
                  Button
                </Button>
                <Button variant="outlined" icon="bookmark-outline">
                  Button
                </Button>
                <Button variant="outlined" disabled>
                  Button
                </Button>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          {/* Icon Button */}
          <ThemedView
            style={{
              ...styles.stepContainer,
              padding: 20,
              gap: 16,
              alignItems: 'flex-start',
              borderRadius: 16,
            }}
          >
            <Text variant="displaySmall">Icon Buttons</Text>
            <ThemedView
              style={{
                ...styles.stepContainer,
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
                <IconButton variant="outlined" icon="plus" size="s" />
                <IconButton variant="outlined" icon="plus" size="m" />
                <IconButton variant="outlined" icon="plus" size="l" />
              </ThemedView>
              <ThemedView
                style={{
                  ...styles.stepContainer,
                  flexDirection: 'row',
                }}
              >
                <IconButton disabled variant="outlined" icon="plus" size="s" />
                <IconButton disabled variant="outlined" icon="plus" size="m" />
                <IconButton disabled variant="outlined" icon="plus" size="l" />
              </ThemedView>
            </ThemedView>
            <ThemedView
              style={{
                ...styles.stepContainer,
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
          </ThemedView>

          {/* Long Button */}
          <ThemedView
            style={{
              ...styles.stepContainer,
              padding: 20,
              gap: 16,
              borderRadius: 16,
            }}
          >
            <Text variant="displaySmall">Long Buttons</Text>
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
          </ThemedView>

          {/* Image Button */}
          <ThemedView
            style={{
              ...styles.stepContainer,
              padding: 20,
              gap: 16,
              borderRadius: 16,
            }}
          >
            <Text variant="displaySmall">Image Buttons</Text>
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
          </ThemedView>

          {/* Card */}
          <ThemedView
            style={{
              ...styles.stepContainer,
              padding: 20,
              gap: 16,
              borderRadius: 16,
            }}
          >
            <Text variant="displaySmall">Cards</Text>
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
                  <Card
                    source={require('@/assets/images/movie1.png')}
                    title="Title"
                    subtitle="Secondary • text"
                  />
                  <Card
                    disabled
                    source={require('@/assets/images/movie1.png')}
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
                  <Card
                    mode="classic"
                    source={require('@/assets/images/movie1.png')}
                    title="Title"
                    subtitle="Secondary • text"
                  />
                  <Card
                    disabled
                    mode="classic"
                    source={require('@/assets/images/movie1.png')}
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
                  <Card
                    mode="compact"
                    source={require('@/assets/images/movie1.png')}
                    title="Title"
                    subtitle="Secondary • text"
                  />
                  <Card
                    aspectRatio="1 / 1"
                    mode="compact"
                    source={require('@/assets/images/movie1.png')}
                    title="Title"
                    subtitle="Secondary • text"
                  />
                  <Card
                    aspectRatio="2 / 3"
                    mode="compact"
                    source={require('@/assets/images/movie1.png')}
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
                  <Card
                    mode="wide-standard"
                    source={require('@/assets/images/movie1.png')}
                    title="Title"
                    subtitle="Secondary • text"
                  />
                  <Card
                    aspectRatio="1 / 1"
                    mode="wide-standard"
                    source={require('@/assets/images/movie1.png')}
                    title="Title"
                    subtitle="Secondary • text"
                  />
                  <Card
                    aspectRatio="2 / 3"
                    mode="wide-standard"
                    source={require('@/assets/images/movie1.png')}
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
                    width: 270,
                  }}
                >
                  <Card
                    mode="wide-classic"
                    source={require('@/assets/images/example.png')}
                    title="Square image (1 / 1)"
                    subtitle="Secondary • text"
                    description="Some description"
                  />
                  <Card
                    aspectRatio="1 / 1"
                    mode="wide-classic"
                    source={require('@/assets/images/example.png')}
                    title="Title"
                    subtitle="Secondary • text"
                    description="Some description"
                  />
                  <Card
                    disabled
                    aspectRatio="2 / 3"
                    mode="wide-classic"
                    source={require('@/assets/images/example.png')}
                    title="Title"
                    subtitle="Secondary • text"
                    description="Some description"
                  />
                </ThemedView>
                <ThemedView
                  style={{
                    ...styles.stepContainer,
                    gap: 32,
                    padding: 20,
                    flexDirection: 'row',
                    borderRadius: 16,
                    width: 270,
                  }}
                >
                  <Card
                    mode="wide-classic"
                    source={require('@/assets/images/movie1.png')}
                    title="Title"
                    subtitle="Secondary • text"
                    description="Some description"
                  />
                  <Card
                    aspectRatio="1 / 1"
                    mode="wide-classic"
                    source={require('@/assets/images/movie1.png')}
                    title="Square image (1 / 1)"
                    subtitle="Secondary • text"
                    description="Some description"
                  />
                  <Card
                    aspectRatio="2 / 3"
                    mode="wide-classic"
                    source={require('@/assets/images/movie1.png')}
                    title="Title"
                    subtitle="Secondary • text"
                    description="Some description"
                  />
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          {/* Dialogs */}
          <ThemedView
            style={{
              ...styles.stepContainer,
              padding: 20,
              gap: 16,
              borderRadius: 16,
            }}
          >
            <Text variant="displaySmall">Dialogs</Text>
            <DialogsExamples />
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
            ></ThemedView>
          </ThemedView>
        </View>

        {/* <PaperProvider> */}

        {/* <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text>Example Modal. Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>
        <Button style={{ marginTop: 30 }} onPress={showModal}>
          Show
        </Button> */}
        {/* </PaperProvider> */}
      </PortalHost>
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
      backgroundColor: Colors.neutral10,
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
