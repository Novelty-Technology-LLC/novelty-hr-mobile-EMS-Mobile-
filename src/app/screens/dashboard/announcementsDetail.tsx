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
import { RenderHtmlComponentForAnnoucementDetail } from "../../common/renderHtml";
import { RequestButton } from "../../components/requestButton";
import { AuthContext } from "../../reducer";

import { getDateWithoutTZ, getFullDate } from "../../utils";

const AnnouncementDetail = (props: any) => {
  const { state: auth }: any = useContext(AuthContext);
  const params = props?.route?.params;

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>{params?.title}</Text>
      </Header>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={globalStyle.titleWeight}>{params?.title}</Text>
          <RenderHtmlComponentForAnnoucementDetail
            htmlData={params?.html.trim()}
            style={{ div: cardStyle.subTitleText, p: cardStyle.subTitleText }}
          />
          <Text style={[cardStyle.subTitleText, { alignSelf: "flex-end" }]}>
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
