import React from "react";
import { View, Text, Image } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../assets/colors";
import {
  overlappingAvatarPosition,
  overlappingAvatarsStyles as styles,
} from "../../assets/styles/common/overlapping_avatars.styles";
export const OverlappingAvatars = ({
  avatars,
  size = 20,
  overlappingWidth = 4,
  numberOfAvatarsToShow = 4,
}: {
  avatars: string[];
  size?: number;
  overlappingWidth?: number;
  numberOfAvatarsToShow?: number;
}) => {
  const avatarStylesFromProps = {
    height: size,
    width: size,
    borderRadius: size / 2,
  };
  const exceededCountStyles = {
    fontSize: normalize(size / 2),
    color: colors.white,
  };
  const countExceeded = avatars.length > numberOfAvatarsToShow;
  return (
    <View style={styles.container}>
      {avatars
        .slice(0, numberOfAvatarsToShow)
        .reverse()
        .map((image, index) => {
          return (
            <Image
              source={{ uri: image }}
              style={[
                styles.image,
                avatarStylesFromProps,
                overlappingAvatarPosition(
                  index,
                  size,
                  overlappingWidth,
                  countExceeded
                ),
              ]}
              key={index}
            />
          );
        })}
      {countExceeded && (
        <View style={[avatarStylesFromProps, styles.exceededAvatar]}>
          <Text style={exceededCountStyles}>
            +{avatars.length - numberOfAvatarsToShow}
          </Text>
        </View>
      )}
    </View>
  );
};
