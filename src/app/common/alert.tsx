import React from 'react';
import { View } from 'react-native';
import Dialog from 'react-native-dialog';
import { deleteAlertStyle } from '../../assets/styles';

const Alert = ({
  showAlert,
  setShowAlert,
  children,
}: {
  showAlert: boolean;
  setShowAlert: Function;
  children: Object;
}) => {
  return (
    <Dialog.Container
      visible={showAlert}
      contentStyle={deleteAlertStyle.dialogContainer}
    >
      <View style={deleteAlertStyle.container}>
        <View style={deleteAlertStyle.main}>
          <Dialog.Title style={deleteAlertStyle.text1}>{children}</Dialog.Title>
        </View>
      </View>
      <View style={deleteAlertStyle.buttons}>
        <Dialog.Button
          label="OK"
          onPress={() => setShowAlert(false)}
          style={deleteAlertStyle.delete}
        />
      </View>
    </Dialog.Container>
  );
};

export { Alert };
