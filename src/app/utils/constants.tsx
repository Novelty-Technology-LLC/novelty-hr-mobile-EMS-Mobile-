import React from "react";
import { Image } from "react-native";
import normalize from "react-native-normalize";
export const HR_ID = 1029;

export const dashboarCard = {
  Menu: (
    <Image
      source={require("../../assets/images/menu.png")}
      style={{
        width: 40,
        height: 30,
        marginLeft: normalize(10),
        marginBottom: normalize(-10),
      }}
    />
  ),
  Employee: (
    <Image
      source={require("../../assets/images/employee.png")}
      style={{
        width: 42,
        height: 30,
        marginLeft: normalize(10),
        marginBottom: normalize(-10),
      }}
    />
  ),
};
