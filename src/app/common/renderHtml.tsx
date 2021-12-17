import React from "react";
import { Linking, useWindowDimensions } from "react-native";
import HTMLView from "react-native-htmlview";
const RenderHtmlComponent = ({ htmlData, parse = false }) => {
  const { width } = useWindowDimensions();
  return (
    <HTMLView
      contentWidth={width}
      onLinkPress={(url: string) => Linking.openURL(url)}
      value={
        parse
          ? htmlData
          : htmlData?.length > 50
          ? htmlData?.slice(0, 50) + "..."
          : htmlData
      }
    />
  );
};

export { RenderHtmlComponent };
