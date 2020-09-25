import React, { useContext, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Dialog from "react-native-dialog";
import colors from "../../../assets/colors";
import { deleteAlertStyle as style } from "../../../assets/styles";
import AppIcon from "../../common/icon";
import { RequestContext } from "../../reducer";

const DeleteAlert = ({ item }: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  const { dispatchRequest } = useContext(RequestContext);

  return (
    <>
      <TouchableOpacity onPress={() => show()} style={style.iconContainer}>
        <AppIcon name="delete" color={colors.tomato} size={13} />
      </TouchableOpacity>
      <Dialog.Container
        visible={showAlert}
        contentStyle={style.dialogContainer}
      >
        <View style={style.container}>
          <AppIcon name="alert" color={colors.tomato} size={30} />
          <View style={style.main}>
            <Dialog.Title style={style.text1}>
              Delete the request ?
            </Dialog.Title>
            <Dialog.Title style={style.text2}>This cant be undone</Dialog.Title>
          </View>
        </View>
        <View style={style.buttons}>
          <Dialog.Button label="CANCEL" onPress={hide} style={style.cancel} />
          <Dialog.Button
            label="DELETE"
            onPress={() => {
              dispatchRequest({ type: "DELETE", payload: item.id });
              hide();
            }}
            style={style.delete}
          />
        </View>
      </Dialog.Container>
    </>
  );
};

export { DeleteAlert };
