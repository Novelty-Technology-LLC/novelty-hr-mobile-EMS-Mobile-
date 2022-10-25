import React from "react";
import { CustomText } from "../text";
import Textarea from "react-native-textarea";
import { onChange } from "react-native-reanimated";
import { Platform } from "react-native";
import { textAreaStyle } from "./textArea";
import { commonInputFieldStyle } from "../../../assets/styles/common/text_input.style";
import colors from "../../../assets/colors";

const alignSelf: any = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
};

export const CustomTextArea = ({
  error = true,
  gap = 10,
  align = "end",
  onChange,
  placeholder,
  maxLength,
  defaultValue,
  descriptionRef,
}: {
  error?: boolean;
  gap?: number;
  align?: string;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
  keyboardType?: any;
  returnKeyType?: any;
  descriptionRef?: any;
  onChange?: (value: any) => void;
}) => {
  return (
    <Textarea
      ref={descriptionRef}
      containerStyle={[
        textAreaStyle.textareaContainer,
        commonInputFieldStyle.field,
      ]}
      style={[
        textAreaStyle.textarea,
        // {
        //   ...commonInputFieldStyle.floatingFieldContainer,
        //   borderColor: colors.darkBlack,
        //   shadowColor: "grey",
        //   ...Platform.select({
        //     android: {
        //       elevation: 4,
        //       shadowOpacity: 0.9,
        //       shadowRadius: 8,
        //       shadowOffset: {
        //         width: 0,
        //         height: 3,
        //       },
        //     },
        //     ios: {
        //       padding: 7,
        //       elevation: 1,
        //       shadowOpacity: 0.3,
        //       shadowRadius: 3,
        //       shadowOffset: {
        //         width: 0,
        //         height: 3,
        //       },
        //     },
        //   }),
        // },
      ]}
      defaultValue={defaultValue}
      onChangeText={onChange}
      maxLength={maxLength}
      placeholder={placeholder}
      placeholderTextColor={colors.fontGrey}
      underlineColorAndroid="transparent"
    />
  );
};
