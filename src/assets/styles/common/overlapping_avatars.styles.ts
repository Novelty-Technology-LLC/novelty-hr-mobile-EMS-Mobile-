import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";
export const overlappingAvatarsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignItems: 'center',
  },
  image: {
    resizeMode: "cover",
    position: "absolute",
    borderWidth: 1,
    borderColor: colors.white,
  },
  exceededAvatar: {
    borderWidth: 1,
    borderColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
    // paddingRight: normalize(5),
    zIndex: -1,
    backgroundColor: colors.primary,
  },
});
export const overlappingAvatarPosition = (
  index: number,
  size: number,
  overlappingWidth: number,
  countExceeded: boolean
) => {
  let padding = index === 0 ? 0 : (size - overlappingWidth) * index;
  if (countExceeded) padding = padding + size - overlappingWidth;
  return {
    right: padding,
  };
};
