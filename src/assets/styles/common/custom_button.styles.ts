import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import color from '../../../assets/colors';
import { fonts, theme } from "../theme";
export const customButtonStyles = StyleSheet.create({
    button: {
        marginTop: normalize(5),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primary,
        marginBottom: normalize(20),
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                borderRadius: normalize(4),
            },
            android: {
                borderRadius: normalize(5),
            },
        }),
    },
    buttonDisabled: {
        opacity: 0.5
    },
    label: {
        fontFamily: fonts.mulishBold,
        paddingVertical: normalize(13),
        color: color.white,
    },
});