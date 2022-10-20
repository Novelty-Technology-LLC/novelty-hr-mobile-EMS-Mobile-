import React from "react";
import { Text, View, Image } from "react-native";
import normalize from "react-native-normalize";
import {
  cardStyle,
  globalStyle,
  headerTxtStyle,
  listingStyle,
} from "../../../assets/styles";
import { shoutoutDetailStyles as sds } from "../../../assets/styles/common/shoutoutDetail.style";
import { header as Header } from "../../common";
import { formatFullName } from "../../utils/constants";
import { getFormatedDate } from "../../utils/dateMapper";
const ShoutoutDetails = (props: any) => {
  const params = props?.route?.params;
  const receiverData: any = params.receiver;
  const senderData: any = params.shoutout_from;
  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>Shoutout </Text>
      </Header>
      <View style={sds.container}>
        <View style={{ flexDirection: "row" }} >
          <Image
            source={require("./../../../assets/images/shoutout.png")}
            style={sds.image}
          />
          <View style={sds.title}>
            <Text style={[cardStyle.subTitleText, sds.name]}>
              {receiverData.map((item: any) => {
                return formatFullName(item.first_name, item.last_name) + " ";
              })}
            </Text>
            <Text style={[cardStyle.subTitleText]}>{'received shoutout from' + ' '}</Text>
            <Text style={[cardStyle.subTitleText]}>
              {senderData.map((item: any) => {
                return formatFullName(item.first_name, item.last_name);
              })}
            </Text>
          </View>
        </View>
        <Text style={sds.shoutout}>{params.shoutout}</Text>
        <Text style={sds.date}>{getFormatedDate(params.shoutout_date)}</Text>
      </View>
    </View >
  );
};
export { ShoutoutDetails };
