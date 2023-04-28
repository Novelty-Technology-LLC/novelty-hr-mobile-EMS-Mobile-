import React, { useContext, useState } from "react";
import { ActivityIndicator, Image, ImageResizeMode, View } from "react-native";
import { TouchableEffect } from "react-native-simple-dialogs";
import { customImageStyle } from "../../assets/styles/common/images.styles";
import { PROFILE_IMAGE } from "../constant/global.constant";
import { navigate } from "../utils/navigation";
import { AuthContext } from "../reducer";
import { boolean } from "yup";

const CustomImage = ({
  image,
  style,
  uri = false,
  loaderSize = "small",
  loaderStyle,
  localImage = false,
  fullScreen = true,
  resizemode = "cover",
  containerStyle,
  userProfile = false,
}: {
  image: string;
  style?: any;
  uri?: boolean;
  loaderSize?: string;
  resizemode?: ImageResizeMode;
  loaderStyle?: any;
  localImage?: boolean;
  fullScreen?: boolean;
  containerStyle?: any;
  userProfile: boolean;
}) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isImageLoadingError, setIsImageLoadingError] = useState(false);
  const customStyle = isImageLoading ? {} : style;
  const { state } = useContext(AuthContext);

  return (
    <>
      {localImage ? (
        <Image
          style={style}
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
          style={containerStyle}
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
          style={containerStyle}
          disabled={fullScreen}
          onPress={() => {
            navigate("fullImageScreen", {
              image: !userProfile ? image : state.user.image_url,
            });
          }}
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
