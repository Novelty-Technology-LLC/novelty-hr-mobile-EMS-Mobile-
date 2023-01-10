import React from "react";
import { Text, View } from "react-native";
import { approveRequest } from "../../../../assets/styles";

const LeaveAlert = ({ responses }: { responses: any }) => {
  return (
    <View style={approveRequest.cardFooterContainer}>
      <View style={approveRequest.cardFooter}>
        <Text style={approveRequest.remainingLeave}>{"Remaining :"}</Text>
        <Text>
          <Text style={approveRequest.totalDays}>
            {responses.used_pto + "/" + responses.total_pto}
          </Text>
          <Text style={approveRequest.leaveTypes}>{" PTO"}</Text>
        </Text>
        <Text>
          <Text style={approveRequest.totalDays}>
            {responses.used_float + "/" + responses.total_float}
          </Text>
          <Text style={approveRequest.leaveTypes}>{" Floating "}</Text>
        </Text>
      </View>
    </View>
  );
};

export default LeaveAlert;
