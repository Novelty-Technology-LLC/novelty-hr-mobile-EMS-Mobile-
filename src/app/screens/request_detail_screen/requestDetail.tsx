import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { header as Header } from "../../common";

import { approveRequest, headerTxtStyle } from "../../../assets/styles";
import Request from "../../components/approveRequest/approve_request";
import { approveRequest as style } from "../../../assets/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RequestButton } from "../../components/requestButton";
import { checkRequest } from "../../services";
import moment from "moment";

const RequestDetail = ({ route }: any) => {
  const { date } = route.params;
  const [isReplied, setIsReplied] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    onEdit();
  }, []);
  const onEdit = () => {
    checkRequest(route?.params?.id)
      .then((res) => {
        if (res === "Pending") {
          if (
            route.params.leave_date.startDate == moment().format("YYYY-MM-DD")
          ) {
            moment().hour() < 10 && setShowAlert(true);
          } else {
            setShowAlert(true);
          }
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

      <Request data={route.params} style={style} type={route.params.type} />
      {showAlert && (
        <RequestButton
          screen="requestLeave"
          floatingIcon="pencil-outline"
          olddata={route?.params}
        />
      )}
    </>
  );
};

export { RequestDetail };
