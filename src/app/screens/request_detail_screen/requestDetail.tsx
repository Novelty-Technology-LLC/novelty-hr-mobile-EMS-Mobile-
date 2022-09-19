import React from "react";
import { Button, Text, View } from "react-native";
import { header as Header } from "../../common";

import { approveRequest, headerTxtStyle } from "../../../assets/styles";
import Request from "../../components/approveRequest/approve_request";
import { approveRequest as style } from "../../../assets/styles";
import { TouchableOpacity } from "react-native-gesture-handler";

const RequestDetail = ({ route }: any) => {
  const { date } = route.params;

  return (
    <>
      <Header icon={true}>
        <View style={approveRequest.headContainer}>
          <Text style={headerTxtStyle.headerText}>{date}</Text>
        </View>
      </Header>

      <Request data={route.params} style={style} />
      <View style={style.buttonView}>
        <TouchableOpacity onPress={() => {}}>
          <View style={style.buttonView}>
            <Text style={style.buttonText}>Submit Request</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export { RequestDetail };
