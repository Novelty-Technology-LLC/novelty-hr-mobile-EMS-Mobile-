import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import React from "react";
import { customButtonStyles } from "../../assets/styles/common/custom_button.style";

export const CustomPressableText = ({
  onPress,
  title,
  style,
  textStyle,
  disable = false,
}: {
  onPress: () => any;
  color?: string;
  title: any;
  icon?: boolean;
  disable?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) => {
  return (
    <View>
      <TouchableOpacity disabled={disable} onPress={onPress} style={[style]}>
        <Text style={textStyle ?? customButtonStyles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
