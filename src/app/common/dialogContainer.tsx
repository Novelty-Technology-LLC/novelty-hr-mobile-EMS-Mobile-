import React from 'react';
import { Dialog } from 'react-native-simple-dialogs';
import { dialogContainerStyle } from '../../assets/styles';

const DialogContainer = ({
  children,
  visible,
  setVisible,
}: {
  children: any;
  visible: boolean;
  setVisible: Function;
}) => {
  return (
    <Dialog
      visible={visible}
      animationType="fade"
      dialogStyle={dialogContainerStyle.dialog}
      contentStyle={dialogContainerStyle.content}
      onTouchOutside={() => setVisible(false)}
      onRequestClose={() => setVisible(false)}
    >
      {children}
    </Dialog>
  );
};

export { DialogContainer };
