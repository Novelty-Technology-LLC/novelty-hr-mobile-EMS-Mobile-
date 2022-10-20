import moment from "moment-timezone";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import {
  cardStyle,
  globalStyle,
  headerTxtStyle,
  listingStyle,
} from "../../../assets/styles";
import { header as Header } from "../../common";
import {
  RenderHtmlComponent,
  RenderHtmlComponentForAnnoucementDetail,
} from "../../common/renderHtml";
import { RequestButton } from "../../components/requestButton";
import { AuthContext } from "../../reducer";
import { AnnouncementContext } from "../../reducer/announcementreducer";
import { getDateWithoutTZ, getFullDate } from "../../utils";
import { transformDate } from "../../utils/listtranform";

const AnnouncementDetail = (props: any) => {
  const { state: auth }: any = useContext(AuthContext);
  const params = props?.route?.params;

  // console.log(params?.date, getDateWithoutTZ(), "detail");
  // console.log(params?.date?.slice(0, 10), "detaidatel");
  // const sliceDate = params?.date?.slice(0, 10);
  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>{params?.title}</Text>
      </Header>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={globalStyle.titleWeight}>{params?.title}</Text>
          <RenderHtmlComponentForAnnoucementDetail htmlData={params?.html} />
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
      {+auth?.user?.is_approver === 1 && params.date === getDateWithoutTZ() && (
        <RequestButton
          floatingIcon="pencil"
          screen="addAnnouncement"
          olddata={{ isEdit: true, data: params }}
        />
      )}
    </View>
  );
};

export { AnnouncementDetail };
