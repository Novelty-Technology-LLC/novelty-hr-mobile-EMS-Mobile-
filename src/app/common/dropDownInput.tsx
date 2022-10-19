import React from 'react';
import { View, Text } from 'react-native';
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker';
import { customTextFieldStyles } from '../../assets/styles/common/custom_text_field.styles';
import { dropDownInputStyles as styles } from '../../assets/styles/common/drop_down_input.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const DropDownInput = ({
    error,
    touched,
    icon,
    dropDownProps,
}: {
    error?: string,
    touched?: boolean,
    icon?: string,
    dropDownProps: DropDownPickerProps,
}) => {
    return (
        <View style={customTextFieldStyles.textinputContainer}>
            <View style={styles.innerContainer}>
                {icon && <Icon
                    name={icon}
                    style={styles.icon}
                />}
                <DropDownPicker {...dropDownProps}
                    style={styles.container}
                    containerStyle={styles.dropdownContainer}
                    dropDownStyle={styles.dropdown}
                    labelStyle={styles.labelStyle}
                />
            </View>
            {error && touched ? <Text style={customTextFieldStyles.error}>{error}</Text> : null}
        </View>
    );
}

