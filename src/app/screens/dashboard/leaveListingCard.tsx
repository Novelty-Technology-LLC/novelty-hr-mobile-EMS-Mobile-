import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import State from "../../components/leave_screen/state";
import {
  cardStyle,
  headerTxtStyle,
  listingStyle,
  requestStyle,
} from "../../../assets/styles";
import { useWindowDimensions } from "react-native";
import { RenderHtmlComponent } from "../../common/renderHtml";


const ListingCard = ({ index, listLength, item,module }) => {
  const { width } = useWindowDimensions();
  return <View
    key={index}
    style={[
      listingStyle.container,
      {
        borderBottomWidth: listLength - 1 === index ? 0 : 1,
      },
    ]}
  >
    <View>
      <Text style={cardStyle.titleText}>{item?.title}</Text>
     {module == "Announcements" ? 
        <RenderHtmlComponent htmlData={item.subTitle}/>
        : <Text style={cardStyle.subTitleText}>{item?.subTitle}</Text>}
    </View>
    <View>
      <State state={item?.status} />
    </View>
  </View>
};
export { ListingCard };
