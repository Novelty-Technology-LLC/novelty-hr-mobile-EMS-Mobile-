import React, { useContext } from "react";
import { View, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import color from "../../assets/colors";
import { headerStyle as style } from "../../assets/styles";
import normalize from "react-native-normalize";

const header = ({ onPress = null, icon = false, children, ...props }: any) => {
  const navigation = useNavigation();

  return (
    <View style={[style.container, props.container]}>
      {icon ? (
        <TouchableWithoutFeedback
          style={style.textView}
          disabled={!icon}
          onPress={icon && (onPress || navigation.goBack)}
        >
          <Icon name="chevron-left" size={30} color={color.primary} />
          {children}
        </TouchableWithoutFeedback>
      ) : (
        <>{children}</>
      )}
    </View>
  );
};

export { header };
