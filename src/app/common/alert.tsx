import React from 'react';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { deleteAlertStyle } from '../../assets/styles';

const Alert = ({
  showAlert,
  setShowAlert,
  children,
}: {
  showAlert: boolean;
  setShowAlert: Function;
  children: string;
}) => {
  return (
    <ConfirmDialog
      title={children}
      visible={showAlert}
      contentStyle={{ display: 'none' }}
      dialogStyle={{ borderRadius: 5 }}
      onTouchOutside={() => setShowAlert(false)}
      titleStyle={deleteAlertStyle.text1}
      positiveButton={{
        titleStyle: deleteAlertStyle.delete,
        title: 'OK',
        onPress: () => setShowAlert(false),
      }}
    ></ConfirmDialog>
  );
};

export { Alert };
