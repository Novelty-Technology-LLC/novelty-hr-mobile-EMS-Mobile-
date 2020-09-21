import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colors from "../../assets/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { leaveDashboardStyle as style } from "../../assets/styles";

const RequestButton = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={style.plus}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("requestLeave")}
        >
          <Icon name="plus" color={colors.white} size={20} />
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export { RequestButton };
