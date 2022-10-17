import React from "react";
import { Text, View, ScrollView } from "react-native";
import { headerTxtStyle, listingStyle } from "../../../assets/styles";
import { header as Header } from "../../common";
const ShoutoutDetails = () => {
  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>Shoutout Details</Text>
      </Header>
      <ScrollView></ScrollView>
    </View>
  );
};
export { ShoutoutDetails };
