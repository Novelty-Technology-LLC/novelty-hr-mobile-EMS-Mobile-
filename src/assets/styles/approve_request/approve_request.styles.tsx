import { Platform, StyleSheet } from "react-native";
import colors from "../../colors";
import { theme, fonts } from "../theme";
import normalize from "react-native-normalize";

const approveRequest = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: normalize(20),
  },
  headContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: normalize(10),
  },
  cardFooter: {
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "space-around",
    alignItems: "center",
    paddingTop: normalize(5),
  },
  cardFooterContainer: {
    paddingTop: normalize(10),
  },
  headerDate: {
    fontFamily: fonts.poppinsMedium,
    color: colors.fontGrey,
    fontSize: normalize(theme.size.xs),
    marginLeft: normalize(theme.spacing.wider),
  },
  cardFooterTextStyle: {
    color: "#8D8D8D",
  },
  footer: {
    flexDirection: "row",
  },
  headerGap: {
    paddingLeft: normalize(6),
  },
  scrollView: { flex: 1 },
  requestView: {
    flexDirection: "column",
    paddingTop: normalize(5),
  },
  main: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: normalize(5),
  },
  imageView: {
    flexDirection: "row",
    alignItems: "center",
  },
  stateView: {
    ...Platform.select({
      android: {
        marginTop: normalize(4),
      },
      ios: {
        marginTop: normalize(2),
      },
    }),
  },
  statusView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(25),
    marginRight: normalize(10),
  },
  senderView: { marginLeft: normalize(8), flex: 1 },
  sender: {
    fontSize: normalize(theme.size.base),
    fontFamily: fonts.mulishBold,
    textTransform: "capitalize",
  },
  dateView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: normalize(4),
  },
  leaveType: {
    fontSize: normalize(theme.size.xxs),
    fontFamily: fonts.poppinsMedium,
    textTransform: "uppercase",
    color: colors.fontGrey,
  },
  date: {
    fontSize: normalize(theme.size.xxs),
    color: colors.fontGrey,
  },
  sendView: {
    flexDirection: "column",
    alignItems: "flex-end",
    alignSelf: "flex-start",
  },
  send: {
    color: colors.white,
    padding: normalize(3),
    backgroundColor: colors.primary,
    borderWidth: 1,
    overflow: "hidden",
    borderColor: colors.primary,
    borderRadius: normalize(8),
  },
  sectionView: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calander: { marginLeft: normalize(10), color: colors.fontGrey },
  sectionDateView: { flex: 1, flexDirection: "row", alignItems: "center" },
  sectionDate: {
    marginLeft: normalize(5),
    fontSize: normalize(theme.size.xs),
    color: colors.fontGrey,
  },
  sectionBody: {
    paddingLeft: normalize(10),
    overflow: "hidden",
  },
  note: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.sm),
    lineHeight: normalize(theme.size.lg),
    paddingTop: normalize(5),
  },
  remainingLeave: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.xs),
    lineHeight: normalize(theme.size.lg),
    paddingTop: normalize(5),
    color: "#8D8D8D",
  },
  remainingDays: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.md),
    lineHeight: normalize(theme.size.lg),
    paddingTop: normalize(5),
    color: "#BF8B59",
  },
  totalDays: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.xs),
    lineHeight: normalize(theme.size.lg),
    paddingTop: normalize(5),
    color: "#BF8B59",
  },
  leaveTypes: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.xs),
    lineHeight: normalize(theme.size.lg),
    paddingTop: normalize(5),
    color: "#8D8D8D",
  },
  responseView: {
    flex: 0.9,
    marginLeft: normalize(10),
    marginTop: normalize(5),
  },
  pendingresponseView: {
    marginTop: normalize(20),
  },
  response: {
    color: colors.fontGrey,
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(theme.size.base),
  },
  spacer: { marginTop: normalize(theme.spacing.wider) },
  teamWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamLeadView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamLead: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.xs),
    color: colors.fontGrey,
  },
  leadText: {
    fontFamily: fonts.mulishRegular,
    lineHeight: normalize(theme.size.lg),
    opacity: 0.7,
    textTransform: "capitalize",
    paddingTop: normalize(7),
  },
  text: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.xxs),
    color: colors.fontGrey,
  },
  buttonView: {
    flex: 0.12,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: normalize(5),
  },
  approve: { color: colors.white, fontFamily: fonts.mulishBold },
  deny: { color: colors.primary, fontFamily: fonts.mulishBold },
  buttonApprove: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: fonts.mulishBold,
    fontSize: normalize(theme.size.base),
    backgroundColor: colors.primary,
    paddingHorizontal: normalize(55),
    paddingVertical: normalize(10),
    ...Platform.select({
      ios: {
        borderRadius: normalize(5),
      },
      android: {
        borderRadius: normalize(5),
      },
    }),
  },
  buttonDeny: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: fonts.mulishBold,
    fontSize: normalize(theme.size.base),
    backgroundColor: colors.white,
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(55),
    ...Platform.select({
      ios: {
        borderRadius: normalize(5),
      },
      android: {
        borderRadius: normalize(5),
      },
    }),
  },
});

export { approveRequest };
