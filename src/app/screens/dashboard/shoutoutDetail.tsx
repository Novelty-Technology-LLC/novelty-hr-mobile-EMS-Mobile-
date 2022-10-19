import React from "react";
import { Text, View, ScrollView, FlatList, Image } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../../assets/colors";
import {
  cardStyle,
  fonts,
  headerTxtStyle,
  listingStyle,
  theme,
} from "../../../assets/styles";
import { shoutoutDetailStyles as sds } from "../../../assets/styles/common/shoutoutDetail.style";
import { header as Header } from "../../common";
import { formatFullName } from "../../utils/constants";
import { getFormatedDate, getShortDate } from "../../utils/dateMapper";
const ShoutoutDetails = (props: any) => {
  const params = props?.route?.params;
  const receiverData: any = params.receiver.flat();
  const senderData: any = params.shoutout_from.flat();
  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>Shoutout </Text>
      </Header>
      <View style={sds.container}>
        <View style={sds.title}>
          <Image
            source={require("./../../../assets/images/shoutout.png")}
            style={sds.image}
          />
          <Text style={[cardStyle.subTitleText, sds.nmae]}>
            {receiverData.map((item: any) => {
              return (
                formatFullName(item.first_name, item.last_name) + "," + " "
              );
            })}
          </Text>
          <Text style={[cardStyle.subTitleText]}> received from </Text>
          <Text style={[cardStyle.subTitleText]}>
            {senderData.map((item: any) => {
              return formatFullName(item.first_name, item.last_name);
            })}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "Poppins, Regular",
            color: colors.fontBlack,
            fontSize: theme.size.xs,
          }}
        >
          {params.shoutout}
        </Text>
        <Text
          style={{
            textAlign: "right",
            color: colors.fade,
            fontSize: theme.size.xxs,
          }}
        >
          {getFormatedDate(params.shoutout_date)}
        </Text>
      </View>
    </View>
  );
};
export { ShoutoutDetails };
