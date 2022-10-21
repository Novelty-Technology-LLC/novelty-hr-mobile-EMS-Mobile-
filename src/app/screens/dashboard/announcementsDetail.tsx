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
import { getFullDate } from "../../utils";
import { transformDate } from "../../utils/listtranform";

const AnnouncementDetail = (props: any) => {
  const { state: auth }: any = useContext(AuthContext);
  const { state }: any = useContext(AnnouncementContext);
  const params = props?.route?.params;

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>
          {params?.title?.length > 25
            ? params?.title?.slice(0, 25) + "..."
            : params?.title}
        </Text>
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
      {+auth?.user?.is_approver === 1 && (
        <RequestButton
          floatingIcon='pencil'
          screen='addAnnouncement'
          olddata={{ isEdit: true, data: params }}
        />
      )}
    </View>
  );
};

export { AnnouncementDetail };
