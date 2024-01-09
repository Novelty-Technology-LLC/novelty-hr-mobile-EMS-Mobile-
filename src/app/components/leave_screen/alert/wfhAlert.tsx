import React from "react";
import { Text, View } from "react-native";
import { approveRequest } from "../../../../assets/styles";

const WfhAlert = ({ responses }: { responses: any }) => {
  return (
    <View style={approveRequest.cardWFHFooter}>
      <View style={approveRequest.cardFooter}>
        <Text style={approveRequest.remainingLeave}>Total WFH :</Text>
        {/* <Text></Text> */}
        <Text>
          <Text style={approveRequest.totalDays}>
            {Math.abs(responses?.remaining ?? 0)}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default WfhAlert;
