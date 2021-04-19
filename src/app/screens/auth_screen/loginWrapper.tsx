import React from "react";
import { Text, View } from "react-native";
import { loginStyle as style } from "../../../assets/styles";
import { buttonui as Logo } from "../../common/ui/buttonUi";

const LoginWrapper = ({ children }: any) => {
  return (
    <View style={style.container}>
      <View style={style.imageView}>
        <Logo name="novelty" />
        <Text style={style.imageText}>Novelty EMS</Text>
      </View>
      {children}
      <View style={style.footerView}>
        <Text style={style.footerText}>
          Copyright {new Date().getFullYear()}. Powered by Novelty Technology.
        </Text>
      </View>
    </View>
  );
};

export default LoginWrapper;
