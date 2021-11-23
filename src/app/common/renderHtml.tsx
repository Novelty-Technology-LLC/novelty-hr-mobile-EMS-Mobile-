import React from "react";
import { Linking, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

const RenderHtmlComponent = ({ htmlData, parse = false }) => {
  const { width } = useWindowDimensions();
  return (
    <RenderHtml
      contentWidth={width}
      onLinkPress={(evt, href) => { console.log('tt->',href);
       Linking.openURL(href) }}
      source={{
        html: 
          parse
            ? htmlData
            : htmlData?.length > 50
            ? htmlData?.slice(0, 50) + "..."
            : htmlData
        ,
      }}
    />
  );
};

export { RenderHtmlComponent };
