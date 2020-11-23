import PushNotification from 'react-native-push-notification';
import { View, StyleSheet, Button, Alert, Linking } from 'react-native';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {},
});

export const SetLocalNotification = (message) => {
  checkPermission();
  PushNotification.localNotification({
    autoCancel: true,
    message: message,
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
