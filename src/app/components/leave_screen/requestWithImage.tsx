import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { requestWithImageStyle as style } from "../../../assets/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../assets/colors";

const RequestWithImage = ({ item, onPress }: any) => {
  return (
    <TouchableOpacity onPress={() => onPress && onPress()}>
      <View style={style.row}>
        <Image
          style={style.image}
          source={require("../../../assets/images/person.jpeg")}
        />
        <View>
          <Text style={style.name}>{item.sender}</Text>
          <Text style={style.type}>{item.type}</Text>
          <View style={style.date}>
            <Icon name="calendar" size={12} color={colors.secondary} />
            <View style={style.gap}></View>
            <Text style={style.type}>{item.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RequestWithImage;
