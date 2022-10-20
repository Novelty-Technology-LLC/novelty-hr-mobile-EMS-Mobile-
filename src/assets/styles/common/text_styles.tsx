import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";
import { color, fonts, theme } from "../theme";

export const textStyles = StyleSheet.create({
    title: {
        fontFamily: fonts.poppinsMedium,
        marginBottom: normalize(10),
        color: colors.black,
    },
    subtitle: {
        fontFamily: fonts.mulishRegular,
        fontSize: normalize(theme.size.xs),
        color: colors.fontGrey,
    },
    description: {
        fontFamily: fonts.poppinsRegular,
        fontSize: normalize(theme.size.normal),
        color: colors.black,

    },
});