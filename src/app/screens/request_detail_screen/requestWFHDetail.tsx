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

const RequestWFHDetail = ({ route }: any) => {
  const { date } = route.params;
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
          <Text style={headerTxtStyle.headerText}>{date}</Text>
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
          olddata={route?.params}
        />
      )}
    </>
  );
};

export { RequestWFHDetail };
