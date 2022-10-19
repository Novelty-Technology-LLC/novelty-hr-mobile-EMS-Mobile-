import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../assets/colors';
import { theme } from '../../assets/styles';
import { customButtonStyles as styles } from '../../assets/styles/common/custom_button.styles'
interface Props {
    label: string,
    onPress: () => void,
    fontSize?: number,
    width?: number | string,
    marginBottom?: number,
    isLoading?: boolean,
    disabled?: boolean,
}
export const CustomButton = ({
    label,
    onPress,
    width = '100%',
    fontSize = normalize(theme.size.base),
    marginBottom = 25,
    isLoading = false,
    disabled,
}: Props) => {
    const buttonStyleFromProps = {
        width,
        marginBottom,
        backgroundColor: disabled ? colors.disabledButton : colors.primary,
    }
    const labelStyleFromProps = {
        fontSize
    };
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.button,
                buttonStyleFromProps
            ]}
            disabled={disabled || isLoading}
        >
            {isLoading ?
                <ActivityIndicator style={styles.label} color={colors.white} />
                :
                <Text
                    style={[styles.label, labelStyleFromProps]}
                >{label}</Text>
            }
        </TouchableOpacity>
    );
}
