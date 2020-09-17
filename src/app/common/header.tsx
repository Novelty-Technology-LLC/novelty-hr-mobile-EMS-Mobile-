import React from "react";
import { View, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

import color from "../../assets/colors";
import { headerStyle as style } from "../../assets/styles";

const header = ({ children }) => {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Icon name="angle-left" size={30} color={color.primary} />
      </TouchableWithoutFeedback>
      <Text style={style.text}>{children}</Text>
    </View>
  );
};

export { header };
