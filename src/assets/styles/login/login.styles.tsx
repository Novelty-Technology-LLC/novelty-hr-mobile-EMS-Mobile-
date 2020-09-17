import { StyleSheet } from "react-native";
import { color } from "../theme";

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  imageView: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
  },
  imageText: {
    fontSize: 27,
    fontWeight: "700",
   
  },
  buttonView: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
  },
  loginView: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 30,
  },
  iconView: {
    padding: 20,
    borderRadius: 50,
    marginHorizontal: 10,
    backgroundColor: color.white,
    shadowColor: color.black,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation:3,
  },
  icon: {
    width: 40,
    height: 40,
  },
  footerView: {
    flex: 0.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.3,
  },
});

export { loginStyle };
