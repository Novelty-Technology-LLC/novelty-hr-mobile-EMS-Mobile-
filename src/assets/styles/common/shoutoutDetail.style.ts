import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";
import { fonts, theme } from "../theme";
export const shoutoutDetailStyles = StyleSheet.create({
  container: {
    marginHorizontal: theme.size.xl,
    marginVertical: theme.size.md,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: normalize(20),
  },
  title: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: theme.size.xxs,
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: normalize(20),
    height: normalize(21),
    marginRight: normalize(10),
  },
  name: {
    fontSize: theme.size.xs,
    fontFamily: fonts.poppinsMedium,
    color: colors.fontBlack,
    fontWeight: "600",
  },
  subtitle: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.xs),
    color: colors.fontGrey,
  },
  shoutout: {
    fontFamily: fonts.poppinsRegular,
    color: colors.fontBlack,
    fontSize: normalize(12),
    textAlign: 'justify',
  },
  date: {
    marginTop: theme.size.lg,
    textAlign: "right",
    color: colors.fade,
    fontSize: theme.size.xxs,
  },
});
