import React from "react";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

const RenderHtmlComponent = ({ htmlData, parse = false }) => {
  const { width } = useWindowDimensions();
  return (
    <RenderHtml
      contentWidth={width}
      source={{
        html: `${
          parse
            ? htmlData
            : htmlData?.length > 50
            ? htmlData?.slice(0, 50) + "..."
            : htmlData
        }`,
      }}
    />
  );
};

export { RenderHtmlComponent };
