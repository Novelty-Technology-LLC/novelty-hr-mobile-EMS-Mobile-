import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Dialog from "react-native-dialog";
import Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../../../assets/colors";
import { editAlertStyle as style } from "../../../assets/styles";
import RequestWithImage from "./requestWithImage";
import State from "./state";

const EditAlert = ({ item }: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => show()}>
        <Icon name="edit" color={colors.yellow} size={15} />
      </TouchableWithoutFeedback>
      <Dialog.Container visible={showAlert}>
        <Dialog.Title style={style.title}>
          Your response is ready to go
        </Dialog.Title>
        <View style={style.row}>
          <RequestWithImage item={item} />
          <State state={item.item.state} />
        </View>
        <View style={style.container}>
          <Text style={style.note}>You can attach a note if you want</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => console.log(text)}
            style={style.textArea}
            placeholder="Write a short note for your response"
            placeholderTextColor={colors.secondary}
          />
        </View>
        <View style={style.buttons}>
          <Dialog.Button label="Cancel" onPress={hide} style={style.cancel} />
          <Dialog.Button label="Submit" onPress={show} style={style.delete} />
        </View>
      </Dialog.Container>
    </View>
  );
};

export default EditAlert;
