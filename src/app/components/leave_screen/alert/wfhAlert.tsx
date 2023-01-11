import React from "react";
import { Text, View } from "react-native";
import { approveRequest } from "../../../../assets/styles";

const WfhAlert = ({ responses }: { responses: any }) => {
  return (
    <View style={approveRequest.cardWFHFooter}>
      <View style={approveRequest.cardFooter}>
        <Text style={approveRequest.remainingLeave}>Remaining Quota :</Text>
        {/* <Text></Text> */}
        <Text>
          <Text style={approveRequest.totalDays}>
            {responses.remaining + "/" + responses.total}
          </Text>
          <Text style={approveRequest.leaveTypes}>{" WFH "}</Text>
        </Text>
      </View>
    </View>
  );
};

export default WfhAlert;
