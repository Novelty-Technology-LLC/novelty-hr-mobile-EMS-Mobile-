import React from "react";
import { Dialog } from "react-native-simple-dialogs";
import { dialogContainerStyle } from "../../assets/styles";

const DialogContainer = ({
  children,
  visible,
  setVisible,
  setdotloader = null,
  dialogStyle,
  onTouchOutside = true,
}: {
  children?: any;
  visible: boolean;
  setVisible: Function;
  setdotloader?: Function;
  dialogStyle?: any;
  onTouchOutside?: boolean;
}) => {
  return (
    <Dialog
      visible={visible}
      animationType="fade"
      dialogStyle={[dialogContainerStyle.dialog, dialogStyle]}
      contentStyle={dialogContainerStyle.content}
      onTouchOutside={() => {
        if (onTouchOutside) {
          setVisible(false);
          setdotloader && setdotloader(false);
        }
      }}
      onRequestClose={() => setVisible(false)}
    >
      {children}
    </Dialog>
  );
};

export { DialogContainer };
