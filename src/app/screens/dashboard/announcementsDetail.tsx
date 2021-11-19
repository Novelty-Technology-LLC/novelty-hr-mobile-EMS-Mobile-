import React from "react";
import { Text, View } from "react-native";
import { headerTxtStyle, listingStyle } from "../../../assets/styles";
import { header as Header } from "../../common";

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
    </View>
  );
};

export { AnnouncementDetail };
