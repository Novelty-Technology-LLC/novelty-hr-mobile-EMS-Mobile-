import React from "react";
import { View, Text } from "react-native";
import { header as Header } from "../../common/header";
import { headerTxtStyle } from "../../../assets/styles";
import { approveRequest as style } from "../../../assets/styles";
import Request from "../../components/approveRequest/approve_request";
import getName from "../../utils/getName";
import getDay from "../../utils/getDay";
import WfhRequestApproval from "../../components/approveRequest/approve_wfh_request";

const ApproveWFHRequest = ({ route }: any) => {
  let { name } = getName(route.params);

  return (
    <>
      <Header icon={true}>
        <View style={style.headContainer}>
          <View>
            <Text style={headerTxtStyle.headerText}>{name}</Text>
          </View>
        </View>
      </Header>
      <WfhRequestApproval
        data={route.params}
        style={style}
        title='admin'
        type={route.params.type}
      />
    </>
  );
};

export { ApproveWFHRequest };
