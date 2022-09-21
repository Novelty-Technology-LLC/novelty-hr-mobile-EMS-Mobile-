import React, { useContext } from "react";
import { View, Text } from "react-native";
import { settingStyle as style } from "../../assets/styles/tabs";
import { tabHeader as Header } from "../common";
import { globalStyle, headerTxtStyle } from "../../assets/styles";
import { ComingSoon as Soon } from "../common";
import { AuthContext } from "../reducer";
import CustomImage from "../common/image";

const FullScreenImage = ({ route, navigation }: any) => {
  return (
    <View style={style.container}>
      <CustomImage image={route?.image} style={globalStyle.fullScreen} />
    </View>
  );
};

export { FullScreenImage };
