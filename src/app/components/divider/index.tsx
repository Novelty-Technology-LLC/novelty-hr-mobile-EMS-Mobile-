import React from "react";
import { StyleProp, TextStyle, View } from "react-native";

const sizes: any = {
  large: 20,
  medium: 10,
  small: 5,
  min: 3,
  two: 2,
  one: 1,
};

export const CustomDivider = ({
  value,
  size,
  axis,
  style,
}: {
  value?: number;
  size?: string;
  axis?: string;
  style?: StyleProp<TextStyle>;
}) => {
  return (
    <View
      style={[
        style,
        axis === "horizontal"
          ? {
              marginHorizontal: value
                ? value
                : size
                ? sizes[size]
                : sizes["medium"],
            }
          : {
              marginVertical: value
                ? value
                : size
                ? sizes[size]
                : sizes["medium"],
            },
      ]}
    />
  );
};
