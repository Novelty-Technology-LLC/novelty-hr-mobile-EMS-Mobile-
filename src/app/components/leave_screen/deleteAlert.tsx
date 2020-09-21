import React, { useState } from "react";
import { View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Dialog from "react-native-dialog";
import colors from "../../../assets/colors";
import { deleteAlertStyle as style } from "../../../assets/styles";

const DeleteAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);

  return (
    <>
      <TouchableOpacity onPress={() => show()} style={style.iconContainer}>
        <Icon name="delete" color={colors.tomato} size={15} />
      </TouchableOpacity>
      <Dialog.Container visible={showAlert}>
        <View style={style.container}>
          <Icon name="alert" color={colors.tomato} size={35} />
          <View style={style.main}>
            <Dialog.Title style={style.text1}>
              Delete the request ?
            </Dialog.Title>
            <Dialog.Title style={style.text2}>This cant be undone</Dialog.Title>
          </View>
        </View>
        <View style={style.buttons}>
          <Dialog.Button label="CANCEL" onPress={hide} style={style.cancel} />
          <Dialog.Button label="DELETE" onPress={show} style={style.delete} />
        </View>
      </Dialog.Container>
    </>
  );
};

export { DeleteAlert };
