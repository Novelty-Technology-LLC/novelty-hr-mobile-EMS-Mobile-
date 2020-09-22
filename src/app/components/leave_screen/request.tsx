import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { requestStyle as style } from "../../../assets/styles";
import AppButton from "../../common/appButton";
import RequestWithImage from "./requestWithImage";
import State from "./state";

const Request = ({ item, other, recieved, onPress }: any) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={style.container} onPress={() => onPress()}>
      {other ? (
        <RequestWithImage item={item} />
      ) : (
        <View>
          <Text style={style.date}>{item.date}</Text>
          <Text style={style.type}>{item.type}</Text>
        </View>
      )}

      {recieved ? (
        <View style={style.subcontainer}>
          <Text style={style.days}>5 days ago</Text>
          <View style={style.buttons}>
            <AppButton
              approve={true}
              title="Approve"
              buttonStyle={style.button}
            />
            <AppButton
              approve={false}
              title="Deny"
              buttonStyle={style.button}
            />
          </View>
        </View>
      ) : (
        <State state={item.state} />
      )}
    </TouchableOpacity>
  );
};

export { Request };
