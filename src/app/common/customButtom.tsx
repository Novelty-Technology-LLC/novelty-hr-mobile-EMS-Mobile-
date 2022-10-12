import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import colors from "../../assets/colors";
import { customButtonStyles as style } from "../../assets/styles/common/custom_button.style";

interface Props {
  label: string;
  onPress: () => void;
  fontSize?: number;
  width?: number | string;
  marginBottom?: number;
  isLoading?: boolean;
}

export const CustomButton = ({
  label,
  onPress,
  width = "100%",
  fontSize = 16,
  marginBottom = 25,
  isLoading = false,
}: Props) => {
  const buttonStyleFromProps = {
    width,
    marginBottom,
  };

  const labelStyleFromProps = {
    fontSize,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style.button, buttonStyleFromProps]}
    >
      {isLoading ? (
        <ActivityIndicator style={style.label} color={colors.white} />
      ) : (
        <Text style={[style.label, labelStyleFromProps]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};
