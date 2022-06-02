import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import {
  cardStyle,
  headerTxtStyle,
  listingStyle,
} from "../../../assets/styles";
import { header as Header } from "../../common";
import { RenderHtmlComponent } from "../../common/renderHtml";
import { getFullDate } from "../../utils";
import { transformDate } from "../../utils/listtranform";

const AnnouncementDetail = (props: any) => {
  const params = props.route.params;
  console.log(params);

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>
          {params.title.length > 25
            ? params.title.slice(0, 25) + "..."
            : params.title}
        </Text>
      </Header>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: "700" }}>{params.title}</Text>
          <RenderHtmlComponent htmlData={params.html} parse />
          <Text
            style={[
              cardStyle.dateText,
              { alignSelf: "flex-end", fontSize: 12 },
            ]}
          >
            {getFullDate(params.date)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export { AnnouncementDetail };
