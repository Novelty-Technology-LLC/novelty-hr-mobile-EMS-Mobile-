import React, { forwardRef } from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';
import { customTextInputStyles as styles } from '../../assets/styles/common/custom_text_input.styles'
export const CustomTextInput = forwardRef(({
    error,
    touched,
    nextFieldRef,
    textInputProps,
    onChange,
}: {
    error?: string | undefined,
    touched?: boolean,
    nextFieldRef?: any,
    textInputProps?: TextInputProps,
    onChange?: (value: string) => void
}, ref: any) => {
    return (
        <View style={styles.textinputContainer}>
            <TextInput
                style={[styles.textInput]}
                ref={ref}
                {...textInputProps}
                onSubmitEditing={() => {
                    nextFieldRef?.current?.focus()
                }}
                onChangeText={onChange}
            />
            {error && touched ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    )
});