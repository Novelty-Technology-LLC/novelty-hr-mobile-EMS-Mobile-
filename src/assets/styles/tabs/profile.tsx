import { StyleSheet, Platform, Dimensions } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";
import { fonts, theme } from "../theme";

const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topContainer: {
    height: normalize(122),
  },
  scrollStyle: {
    backgroundColor: colors.primary,
    position: "relative",
  },
  infoStyle: {
    borderTopLeftRadius: 22,
    backgroundColor: "white",
    borderTopRightRadius: 22,
    height: Dimensions.get("screen").height / 1.5,
  },
  imageView: {
    paddingVertical: normalize(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  confirm: {
    flexDirection: "row",
  },
  spacer: {
    marginHorizontal: normalize(10),
  },
  image: {
    width: normalize(143),
    height: normalize(143),
    borderRadius: normalize(100),
  },
  headerImage: {
    width: normalize(35),
    height: normalize(35),
    borderRadius: normalize(50),
  },
  imageWrapper: {
    width: normalize(106),
    height: normalize(106),
    borderRadius: normalize(53),
    borderWidth: normalize(6),
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrappers: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(53),
    borderWidth: normalize(4),
    borderColor: colors.white,
    backgroundColor: colors.primary,

    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: normalize(10),
  },
  labelText: {
    fontFamily: fonts.mulishRegular,
    color: colors.white,
    marginLeft: normalize(4),
    fontSize: normalize(theme.size.base),
  },
  infoView: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: normalize(15),
  },
  heading: {
    fontFamily: fonts.poppinsMedium,
    color: colors.black,
    fontSize: normalize(theme.size.base),
  },
  body: {
    width: "100%",
    flexDirection: "column",
    paddingBottom: normalize(10),
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: normalize(10),
  },
  msg: {
    paddingLeft: normalize(10),
    ...Platform.select({
      ios: {
        paddingTop: normalize(5),
      },
      android: {
        paddingTop: normalize(7),
      },
    }),
  },
  profileContainerWrapper: {
    position: "absolute",
    alignContent: "center",
    justifyContent: "center",
    top: normalize(55),
    left: normalize(136),
  },
  profileImageWrapper: {
    position: "absolute",
    borderWidth: 4,
    borderColor: "white",
  },

  iconCammerWrapper: {
    position: "absolute",
    bottom: normalize(5),
    right: -30,
  },
  gender: {
    textTransform: "capitalize",
    marginLeft: normalize(8),
    fontFamily: fonts.poppinsRegular,
    ...Platform.select({
      android: {
        marginTop: normalize(5),
      },
    }),
  },
  text: {
    marginLeft: normalize(8),
    fontFamily: fonts.poppinsRegular,
    ...Platform.select({
      android: {
        marginTop: normalize(5),
      },
    }),
  },
  designation: {
    marginLeft: normalize(10),
    fontFamily: fonts.poppinsRegular,
    ...Platform.select({
      android: {
        marginTop: normalize(8),
      },
      ios: {
        marginTop: normalize(5),
      },
    }),
  },
  date: {
    marginLeft: normalize(6),
    fontFamily: fonts.poppinsRegular,
    ...Platform.select({
      ios: {
        marginTop: normalize(7),
      },
      android: {
        marginTop: normalize(10),
      },
    }),
  },
  modalCalender: {
    width: "95%",
    alignItems: "center",
    paddingBottom: normalize(25),
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "90%",
  },
});

export { profileStyle };
