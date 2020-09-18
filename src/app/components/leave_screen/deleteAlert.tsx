import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Dialog from "react-native-dialog";
import colors from "../../../assets/colors";
import { deleteAlertStyle as style } from "../../../assets/styles";

const DeleteAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => show()}>
        <Icon name="trash" color={colors.tomato} size={15} />
      </TouchableWithoutFeedback>
      <Dialog.Container visible={showAlert}>
        <View style={style.container}>
          <Icon name="warning" color={colors.tomato} size={35} />
          <View style={style.gap}></View>
          <Dialog.Title>Delete the request ?</Dialog.Title>
        </View>
        <Dialog.Button label="Cancel" onPress={hide} style={style.cancel} />
        <Dialog.Button label="Delete" onPress={show} style={style.delete} />
      </Dialog.Container>
    </>
  );
};

export { DeleteAlert };
