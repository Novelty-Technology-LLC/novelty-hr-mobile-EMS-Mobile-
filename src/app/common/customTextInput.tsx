import React, { forwardRef } from "react";
import { View, TextInput, Text, TextInputProps } from "react-native";
import { customTextFieldStyles as styles } from "../../assets/styles/common/custom_text_field.styles";

export const CustomTextInput = forwardRef(
  (
    {
      error,
      touched,
      onChange,
      nextFieldRef,
      textInputProps,
    }: {
      error?: string | undefined;
      onChange?(text: any): any;
      touched?: boolean;

      nextFieldRef?: any;
      textInputProps?: TextInputProps;
    },
    ref: any
  ) => {
    return (
      <View style={styles.textinputContainer}>
        <TextInput
          onChangeText={onChange}
          style={[styles.textInput]}
          ref={ref}
          {...textInputProps}
          onSubmitEditing={() => {
            nextFieldRef?.current?.focus();
          }}
        />
        {error && touched ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  }
);
