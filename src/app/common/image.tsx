import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageResizeMode,
  Pressable,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TouchableEffect } from "react-native-simple-dialogs";
import { customImageStyle } from "../../assets/styles/common/images.styles";
import { PROFILE_IMAGE } from "../constant/global.constant";
import { navigate } from "../utils/navigation";

const CustomImage = ({
  image,
  style,
  uri = false,
  loaderSize = "small",
  loaderStyle,
  localImage = false,
  fullScreen = true,
  resizemode = "cover",
}: {
  image: string;
  style?: any;
  uri?: boolean;
  loaderSize?: string;
  resizemode?: ImageResizeMode;
  loaderStyle?: any;
  localImage?: boolean;
  fullScreen?: boolean;
}) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);
  const customStyle = isImageLoading ? {} : style;

  return (
    <>
      {localImage ? (
        <Image
          source={image}
          onError={() => {
            setIsImageLoadingError(true);
            setIsImageLoading(false);
          }}
          onLoadEnd={() => {
            setIsImageLoading(false);
          }}
        />
      ) : image === null || !image ? (
        <TouchableEffect
          disabled={fullScreen}
          onPress={() => navigate("fullImageScreen", { image: PROFILE_IMAGE })}
        >
          <Image
            style={customStyle ?? customImageStyle.imageLoader}
            source={{
              uri: PROFILE_IMAGE,
            }}
            onError={(error) => {
              setIsImageLoadingError(true);
              setIsImageLoading(false);
            }}
            onLoadEnd={() => {
              setIsImageLoading(false);
            }}
          />
        </TouchableEffect>
      ) : (
        <TouchableEffect
          disabled={fullScreen}
          onPress={() => navigate("fullImageScreen", { image: image })}
        >
          <Image
            style={customStyle ?? customImageStyle.imageLoader}
            source={{
              uri: isImageLoadingError ? PROFILE_IMAGE : image,
            }}
            resizeMode={resizemode}
            onError={(error) => {
              setIsImageLoadingError(true);
              setIsImageLoading(false);
            }}
            onLoadEnd={() => {
              setIsImageLoading(false);
            }}
          />
        </TouchableEffect>
      )}
      {isImageLoading && (
        <View style={[loaderStyle, customImageStyle.imageLoader]}>
          <ActivityIndicator />
        </View>
      )}
    </>
  );
};

export default CustomImage;
