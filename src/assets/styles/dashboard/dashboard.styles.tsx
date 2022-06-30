<<<<<<< HEAD
import { Platform, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'
import { fonts, theme } from '..'
import colors from '../../colors'
=======
import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { fonts, theme } from "..";
import colors from "../../colors";
>>>>>>> 70fe053ab2a29314f99bcfd44c1ef9c73805e174

const dashboardStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingTop: normalize(15),
    backgroundColor: colors.white,
    paddingHorizontal: normalize(20),
  },
  text: {
    color: colors.text,
    fontSize: normalize(16),
  },
  gap: {
    marginTop: normalize(5),
  },
  name: {
    color: colors.black,
    fontSize: normalize(theme.size.normal),
    fontFamily: fonts.PoppinsSemibold,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  work: {
    flexDirection: "row",
    alignItems: "center",
    padding: normalize(10),
    borderRadius: normalize(20),
    borderColor: colors.lightGrey,
    borderWidth: 1,
  },
  workText: {
    color: colors.fontGrey,
    fontSize: normalize(12),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  image: {
    height: normalize(40),
    width: normalize(40),
    borderRadius: normalize(20),
  },
  wrapContainer: {
<<<<<<< HEAD
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
=======
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
>>>>>>> 70fe053ab2a29314f99bcfd44c1ef9c73805e174
  },
  wrapItem: {
    width: "49%",
    marginTop: normalize(25),
    borderRadius: normalize(8),
  },
  timeLog: {
    marginTop: normalize(20),
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  marking: {
    marginTop: normalize(20),
    paddingRight: normalize(30),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: -100,
  },
  markingBody: { flexDirection: "row", alignItems: "center" },
  markingGap: {
    marginLeft: normalize(7),
  },
  border: {
    height: normalize(1),
    width: normalize(15),
    borderRadius: normalize(Platform.OS === "ios" ? 2 : 4),
    borderWidth: normalize(Platform.OS === "ios" ? 3 : 5),
  },
  chartWrapper: {
    marginTop: normalize(16),
<<<<<<< HEAD
    width: '100%',
    overflow: 'hidden',
=======
    width: "100%",
    overflow: "hidden",
>>>>>>> 70fe053ab2a29314f99bcfd44c1ef9c73805e174
    marginBottom: normalize(50),
  },
  loader: {
    backgroundColor: "transparent",
    height: normalize(180),
    width: "100%",
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(4),
  },
})

export { dashboardStyle }
