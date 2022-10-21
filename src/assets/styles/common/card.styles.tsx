import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { theme } from "..";
import colors from "../../colors";
import { fonts } from "../theme";

const cardStyle = StyleSheet.create({
  container: { flexDirection: "column", marginTop: normalize(40) },
  module: { marginTop: normalize(10) },
  textContainer: {
    marginTop: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(8),
  },
  icon: {
    flexDirection: "column",
    flexWrap: "wrap",

    justifyContent: "space-between",
    alignContent: "flex-start",

    width: "70%",
    display: "flex",
  },
  title: {
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "center",
  },
  subTitle: {
    marginTop: 6,
  },
  titleText: {
    fontFamily: fonts.mulishBold,
  },
  subTitleText: {
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(12),
    color: colors.fontGrey,
    flexWrap: "wrap",
  },
  indicator: { position: "absolute", top: normalize(17), right: normalize(0) },
  detailIndicator: {
    marginRight: normalize(5),
    marginTop: normalize(5),
    alignSelf: "flex-start",
  },
  dateText: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.xxs),
    color: colors.fontGrey,
  },
});

export { cardStyle };
