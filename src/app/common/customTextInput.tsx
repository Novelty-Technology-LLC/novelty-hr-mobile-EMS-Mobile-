import React, { forwardRef } from 'react';
import { View, TextInput, Text, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { customTextFieldStyles as styles } from '../../assets/styles/common/custom_text_field.styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CustomTextInput = forwardRef(({
  error,
  touched,
  nextFieldRef,
  textInputProps,
  icon,
  onChange,
  style,
}: {
  error?: string | undefined,
  touched?: boolean,
  nextFieldRef?: any,
  icon?: string,
  textInputProps?: TextInputProps,
  onChange?: (value: string) => void,
  style?: StyleProp<ViewStyle>
}, ref: any) => {

  return (
    <View style={[styles.textinputContainer, style]}>
      <View style={styles.innerContainer}>
        {icon && <Icon
          name={icon}
          style={styles.icon}
        />}
        <TextInput
          style={[styles.textInput]}
          ref={ref}
          {...textInputProps}
          onSubmitEditing={() => {
            nextFieldRef?.current?.focus()
          }}
          onChangeText={onChange}
        />
      </View>
      {error && touched ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
});
