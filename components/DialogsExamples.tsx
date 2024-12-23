import * as React from 'react';
import { View } from 'react-native';
import color from 'color';

import Button from '@/ds/components/Button';
import Dialog from '@/ds/components/Dialog';
import Text from '@/ds/components/Typography/Text';
import LongButton from '@/ds/components/LongButton';
import { useInternalTheme } from '@/ds/styles/ThemeProvider';

const DialogsExamplesStandart = () => {
  const theme = useInternalTheme();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Button onPress={showDialog} style={{ width: 200 }}>
        Standart Dialog
      </Button>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        contsntStyle={{ width: 530 }}
      >
        <Dialog.Title>Title goes here</Dialog.Title>
        <Dialog.Content>
          <Text
            variant="bodyLarge"
            style={{
              color: color(theme.colors.onSurface).alpha(0.8).rgb().toString(),
            }}
          >
            The title provides a clear and concise headline, while the subtitle
            offers additional context or a supporting statement. The description
            offers a more detailed explanation of the content, product, or
            feature being presented.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Primary</Button>
          <Button onPress={hideDialog}>Secondary</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const DialogsExamplesFullScreen = () => {
  const theme = useInternalTheme();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Button onPress={showDialog} style={{ width: 200 }}>
        Full Screen Dialog
      </Button>
      <Dialog
        variant="full-screen"
        visible={visible}
        onDismiss={hideDialog}
        contsntStyle={{ width: 530 }}
      >
        <Dialog.Icon icon="information-outline" />
        <Dialog.Title>Title goes here</Dialog.Title>
        <Dialog.Content>
          <Text
            variant="bodyLarge"
            style={{
              textAlign: 'center',
              color: color(theme.colors.onSurface).alpha(0.8).rgb().toString(),
            }}
          >
            The title provides a clear and concise headline, while the subtitle
            offers additional context or a supporting statement. The description
            offers a more detailed explanation of the content, product, or
            feature being presented.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Primary</Button>
          <Button onPress={hideDialog}>Secondary</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const DialogsExamplesTwoColumns = () => {
  const theme = useInternalTheme();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Button onPress={showDialog} style={{ width: 200 }}>
        Two columns Dialog
      </Button>
      <Dialog
        variant="two-columns"
        visible={visible}
        onDismiss={hideDialog}
        contsntStyle={{ width: 800 }}
      >
        <View style={{ gap: 16, maxWidth: 330 }}>
          <Dialog.Title>Title goes here</Dialog.Title>
          <Dialog.Content>
            <Text
              variant="bodyLarge"
              style={{
                color: color(theme.colors.onSurfaceVariant)
                  .alpha(0.8)
                  .rgb()
                  .toString(),
              }}
            >
              The title provides a clear and concise headline, while the
              subtitle offers additional context or a supporting statement. The
              description offers a more detailed explanation of the content,
              product, or feature being presented.
            </Text>
          </Dialog.Content>
        </View>
        <Dialog.Actions>
          <LongButton icon="plus" onPress={hideDialog}>
            Primary
          </LongButton>
          <LongButton icon="plus" onPress={hideDialog}>
            Secondary
          </LongButton>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const DialogsExamples = () => {
  return (
    <>
      <DialogsExamplesStandart />
      <DialogsExamplesFullScreen />
      <DialogsExamplesTwoColumns />
    </>
  );
};

export default DialogsExamples;
