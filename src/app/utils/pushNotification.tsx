import PushNotification from "react-native-push-notification";

// PushNotification.configure({
//   // (required) Called when a remote or local notification is opened or received
//   onNotification: function (notification) {},
// });

export const SetLocalNotification = (message: any) => {
  // checkPermission();
  PushNotification.localNotification({
    autoCancel: true,
    message: message,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: "default",
    actions: '["Yes", "No"]',
  });
};

// export const checkPermission = () => {
//   PushNotification.checkPermissions((permission) => {
//     console.log('Perssmion push noticcation ', permission);
//   });
// };
