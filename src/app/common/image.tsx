import React, { useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { customImageStyle } from "../../assets/styles/common/images.styles";
import { PROFILE_IMAGE } from "../constant/global.constant";
import { convertByteArrayToImage } from "../utils";
import { navigate } from "../utils/navigation";

const CustomImage = ({
  image,
  style,
  uri = false,
  loaderSize = "small",
  loaderStyle,
  localImage = false,
}: {
  image: string;
  style?: any;
  uri?: boolean;
  loaderSize?: string;
  loaderStyle?: any;
  localImage?: boolean;
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
      ) : image === null ? (
        <Image
          style={customStyle ?? customImageStyle.imageLoader}
          source={{
            uri: PROFILE_IMAGE,
          }}
          resizeMode="cover"
          onError={(error) => {
            setIsImageLoadingError(true);
            setIsImageLoading(false);
          }}
          onLoadEnd={() => {
            setIsImageLoading(false);
          }}
        />
      ) : (
        <Image
          style={customStyle ?? customImageStyle.imageLoader}
          source={{
            uri: isImageLoadingError ? PROFILE_IMAGE : image,
          }}
          resizeMode="cover"
          onError={(error) => {
            setIsImageLoadingError(true);
            setIsImageLoading(false);
          }}
          onLoadEnd={() => {
            setIsImageLoading(false);
          }}
        />
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
