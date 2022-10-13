import React from "react";
import { StyleSheet } from "react-native";
import { Linking, useWindowDimensions } from "react-native";
import HTMLView from "react-native-htmlview";
import colors from "../../assets/colors";
const RenderHtmlComponent = ({ htmlData, parse = false }: any) => {
  const { width } = useWindowDimensions();
  const webViewStyle = StyleSheet.create({
    p: { color: colors.black },
    a: { color: "green" },
  });
  return (
    <HTMLView
      contentWidth={width}
      onLinkPress={(url: string) => Linking.openURL(url)}
      stylesheet={webViewStyle}
      value={
        parse
          ? { htmlData }
          : htmlData?.length > 50
          ? htmlData?.slice(0, 50) + "..."
          : htmlData
      }
    />
  );
};
const RenderHtmlComponentForAnnoucementDetail = ({
  htmlData,
  parse = false,
}: any) => {
  const { width } = useWindowDimensions();
  const webViewStyle = StyleSheet.create({
    p: { color: colors.darkBlue },
    a: { color: colors.darkBlue },
  });

  return (
    <HTMLView
      contentWidth={width}
      onLinkPress={(url: string) => Linking.openURL(url)}
      stylesheet={webViewStyle}
      value={htmlData}
    />
  );
};

export { RenderHtmlComponent, RenderHtmlComponentForAnnoucementDetail };
