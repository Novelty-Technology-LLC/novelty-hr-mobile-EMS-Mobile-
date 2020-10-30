import PushNotification from 'react-native-push-notification';
import { View, StyleSheet, Button, Alert } from 'react-native';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  },
});

export const SetLocalNotification = () => {
  checkPermission();
  PushNotification.localNotification({
    autoCancel: true,
    bigText: 'Mobile utility push notification demo.',
    subText: 'Remote notification',
    title: 'Mobilie utility',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
  });
};

export const checkPermission = () => {
  PushNotification.checkPermissions((permission) => {
    console.log('Perssmion push noticcation ', permission);
  });
};
