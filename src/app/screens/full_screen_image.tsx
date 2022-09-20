import React from "react";
import { StatusBar, View } from "react-native";
import { settingStyle as style } from "../../assets/styles/tabs";
import { globalStyle, headerTxtStyle } from "../../assets/styles";
import CustomImage from "../common/image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../assets/colors";
import { goBack } from "../utils/navigation";

export const FullImageScreen = ({ route, navigation }: any) => {
  return (
    <View style={style.container}>
      <StatusBar hidden={true} />

      <CustomImage
        image={route?.params?.image}
        style={globalStyle.fullScreen}
        resizemode="contain"
      />
      <Icon
        name="close-circle"
        color={colors.primary}
        size={30}
        style={{ alignSelf: "flex-end", position: "absolute", padding: 15 }}
        onPress={() => {
          goBack();
        }}
      />
    </View>
  );
};
