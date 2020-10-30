import PushNotification from 'react-native-push-notification';
import { View, StyleSheet, Button, Alert } from 'react-native';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('notif recieved -> ');
  },
});

export const SetLocalNotification = () => {
  checkPermission();
  PushNotification.localNotification({
    autoCancel: true,
    message: 'You have got a new request',
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
