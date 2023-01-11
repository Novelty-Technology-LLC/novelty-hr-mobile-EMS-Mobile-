import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Linking, useWindowDimensions } from "react-native";
import HTMLView from "react-native-htmlview";
import colors from "../../assets/colors";
import { CustomText } from "../components/text";
const RenderHtmlComponent = ({ htmlData, parse = false, style }: any) => {
  const { width } = useWindowDimensions();
  const webViewStyle = StyleSheet.create({
    a: { color: "green" },
    p: { color: colors.darkBlue },

    ...style,
  });

  const getHTMLValue = (value: any) => {
    return value.slice(0, 50);
  };

  return (
    <>
      {htmlData?.length > 50 ? (
        <HTMLView
          // renderNode={renderNode}
          contentWidth={width}
          onLinkPress={(url: string) => Linking.openURL(url)}
          stylesheet={webViewStyle}
          value={getHTMLValue(htmlData.replace(/&nbsp;/g, "").trim())}
        />
      ) : (
        <HTMLView
          // renderNode={() => renderNode(htmlData)}
          contentWidth={width}
          onLinkPress={(url: string) => Linking.openURL(url)}
          stylesheet={webViewStyle}
          value={htmlData}
        />
      )}
    </>
  );
};
const RenderHtmlComponentForAnnoucementDetail = ({
  htmlData,
  parse = false,
  style,
}: any) => {
  const { width } = useWindowDimensions();
  const webViewStyle = StyleSheet.create({
    p: { color: colors.darkBlue },
    a: { color: colors.darkBlue },
    ...style,
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
