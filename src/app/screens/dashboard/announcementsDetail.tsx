import React from "react";
import { Text, View } from "react-native";
import { headerTxtStyle, listingStyle } from "../../../assets/styles";
import { header as Header } from "../../common";
import { RenderHtmlComponent } from "../../common/renderHtml";

const AnnouncementDetail = (props: any) => {
  const params = props.route.params;
  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>
          {params.headerText.length > 20
            ? params.headerText.slice(0, 20) + "..."
            : params.headerText}
        </Text>
      </Header>
      <View style={{padding:20}}>
        <Text style={{fontWeight:'700'}}>{params.title}</Text>
        <RenderHtmlComponent htmlData={params.subTitle} parse/>
      </View>
    </View>
  );
};

export { AnnouncementDetail };
