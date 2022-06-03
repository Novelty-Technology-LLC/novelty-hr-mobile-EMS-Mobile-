import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import State from "../../components/leave_screen/state";
import {
  cardStyle,
  headerTxtStyle,
  listingStyle,
  requestStyle,
} from "../../../assets/styles";
import { useWindowDimensions } from "react-native";
import { RenderHtmlComponent } from "../../common/renderHtml";
import { getShortDate } from "../../utils";
import { profileStyle as style } from "../../../assets/styles/tabs";

const ListingCard = ({ index, listLength, item, module }: any) => {
  return (
    <View
      key={index}
      style={[
        listingStyle.container,
        {
          borderBottomWidth: listLength - 1 === index ? 0 : 1,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 10,
          }}
        >
          <Text style={cardStyle.titleText}>
            {item.title && item.title.length > 40
              ? item.title.slice(0, 40) + "..."
              : item.title}
          </Text>
          {module == "Announcements" && (
            <Text style={[cardStyle.dateText, { fontSize: 11 }]}>
              {getShortDate(item.date)}
            </Text>
          )}
        </View>
        {module == "Announcements" ? (
          <RenderHtmlComponent htmlData={item.subTitle} />
        ) : (
          <Text style={cardStyle.subTitleText}>{item?.subTitle}</Text>
        )}
      </View>
      {module == "employeeList" && (
        <Image
          style={style.headerImage}
          source={{
            uri: item.image,
          }}
        />
      )}
      <View>
        <State state={item?.status} />
      </View>
    </View>
  );
};
export { ListingCard };
