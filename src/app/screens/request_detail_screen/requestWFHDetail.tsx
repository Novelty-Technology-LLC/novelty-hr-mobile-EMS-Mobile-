import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { header as Header } from "../../common";

import { approveRequest, headerTxtStyle } from "../../../assets/styles";
import Request from "../../components/approveRequest/approve_request";
import { approveRequest as style } from "../../../assets/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RequestButton } from "../../components/requestButton";
import { checkRequest, checkWFHRequest } from "../../services";
import { NAVIGATION_ROUTE } from "../../constant/navigation.contant";
import { WFHRequest } from "../../components/wFHScreen/WFHrequest";
import WfhRequestApproval from "../../components/approveRequest/approve_wfh_request";
import moment from "moment";
import getDay from "../../utils/getDay";

const RequestWFHDetail = ({ route }: any) => {
  const item = route.params;
  const { dayRange } = getDay(item);
  const [isReplied, setIsReplied] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    onEdit();
  }, []);
  const onEdit = () => {
    checkWFHRequest(route?.params?.id)
      .then((res) => {
        if (res === "Pending") {
          setShowAlert(true);
        }
      })
      .catch((err) => {});
  };
  return (
    <>
      <Header icon={true}>
        <View style={approveRequest.headContainer}>
          <Text style={headerTxtStyle.headerText}>{dayRange}</Text>
        </View>
      </Header>

      <WfhRequestApproval
        data={route.params}
        style={style}
        screenName={"WorkFromHome"}
        type={"Work From Home"}
      />
      {showAlert && (
        <RequestButton
          screen={NAVIGATION_ROUTE.Request_WFH}
          floatingIcon="pencil-outline"
          olddata={{
            ...item,
            date: {
              startDate: moment(item?.start_date.slice(0, 10)).format("llll"),
              endDate: moment(item?.end_date.slice(0, 10)).format("llll"),
            },
          }}
        />
      )}
    </>
  );
};

export { RequestWFHDetail };
