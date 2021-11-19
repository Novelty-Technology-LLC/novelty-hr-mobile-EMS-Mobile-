import React from "react";
import { View, Text, Platform } from "react-native";
import colors from "../../../assets/colors";
import { cardStyle, listStyle, timeLogStyle } from "../../../assets/styles";
import { getColor } from "../../utils/listtranform";
import normalize from "../../utils/normalize";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

const ListItem = ({
  title,
  subTitle,
  isLast,
  type,
  module,
}: {
  title: string;
  subTitle: string;
  isLast: boolean;
  type?: string;
  module?: string;
}) => {
  const indicatorColor = getColor(type, colors.lightbrown);
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        listStyle.itemContainer,
        {
          borderBottomWidth: isLast ? 0 : 1,
        },
      ]}
    >
      <Text style={cardStyle.titleText}>{title}</Text>
      {module == "Announcements" ? (
        <RenderHtml
          contentWidth={width}
          source={{
            html: `${subTitle.length > 50 ? subTitle.slice(0, 50)+'...' : subTitle}`,
          }}
        />
      ) : (
        <Text style={cardStyle.subTitleText}>{subTitle}</Text>
      )}
      <View
        style={[
          timeLogStyle.indicator,
          cardStyle.indicator,
          {
            backgroundColor: indicatorColor,
            ...Platform.select({
              ios: {
                marginRight: normalize(-1),
              },
            }),
          },
        ]}
      />
    </View>
  );
};

export { ListItem };
