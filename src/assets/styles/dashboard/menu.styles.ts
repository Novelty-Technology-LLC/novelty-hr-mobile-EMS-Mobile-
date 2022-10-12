import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

import { fonts } from "../theme";

export const menuStyles = StyleSheet.create({
    title: {
        fontFamily: fonts.mulishBold,
        marginBottom: normalize(10),
    },
})