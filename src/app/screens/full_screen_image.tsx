import React from "react";
import { StatusBar, View } from "react-native";
import { settingStyle as style } from "../../assets/styles/tabs";
import { color, globalStyle, headerTxtStyle } from "../../assets/styles";
import CustomImage from "../common/image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../assets/colors";
import { goBack } from "../utils/navigation";

export const FullImageScreen = ({ route, navigation }: any) => {
  return (
    <View style={[style.container, { backgroundColor: color.black }]}>
      <StatusBar hidden={true} />
      <CustomImage
        image={route?.params?.image}
        containerStyle={globalStyle.fullScreen}
        resizemode='contain'
      />
      <Icon
        name='close-circle'
        color={colors.primary}
        size={30}
        style={globalStyle.closeIconFullScreen}
        onPress={() => {
          goBack();
        }}
      />
    </View>
  );
};
