import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { requestStyle as style } from "../../../assets/styles";

import getDay from "../../utils/getDay";
import { AdminRequestContext, AuthContext } from "../../reducer";
import { getLeaveOption } from "../../utils/getLeaveType";
import State from "../leave_screen/state";
import RequestWithImage from "../leave_screen/requestWithImage";
import { ApproveDeny } from "../leave_screen/approveDeny";

interface requestPropType {
  item: any;
  other?: boolean;
  recieved?: boolean;
  onPress?: Function;
}

const WFHRequest = ({ item, other, recieved, onPress }: requestPropType) => {
  let { day } = getDay(item);
  const [isReplied, setIsReplied] = useState(false);
  const { state } = useContext(AuthContext);
  const { adminrequests } = useContext(AdminRequestContext);
  console.log("itemasbdiabsdkbasjkd", item.start_date);

  const checkReplied = () => {
    item.leave_approvals &&
      item.leave_approvals.map((item) => {
        if (item.requested_to === state.user.id) {
          setIsReplied(true);
        }
      });
  };

  useEffect(() => {
    checkReplied();
  }, [adminrequests.adminrequests]);
  const work_option = getLeaveOption(item?.option);

  return (
    <>
      {!other ? (
        <TouchableOpacity
          style={style.container}
          onPress={() => onPress && !other && onPress()}
        >
          <View style={style.dateView}>
            <View style={style.status}>
              <Text style={style.date}>{item?.start_date}</Text>
              <View style={style.stateView}>
                <State state={item.status} />
              </View>
            </View>
            <Text style={style.type}>
              {/* <Text> {"Work From Home"}</Text> */}
              {work_option && <Text> {`${work_option}`}</Text>}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={style.container}>
          <RequestWithImage
            item={item}
            onPress={onPress}
            type={""}
            name={item.start_date}
          />
          {recieved ? (
            <View style={style.subcontainer}>
              <Text style={style.days}>
                {day > 1 ? day + " days ago" : (day = " Today")}
              </Text>
              <View style={style.status}>
                <State state={item.status} />
              </View>
              {!isReplied && (
                <View style={style.buttonContainer}>
                  <ApproveDeny
                    title="Approve"
                    style={style}
                    item={item}
                    screenName="WFH"
                  />
                  <View style={style.buttonSpacer}></View>
                  <ApproveDeny
                    title="Deny"
                    style={style}
                    item={item}
                    screenName="WFH"
                  />
                </View>
              )}
            </View>
          ) : (
            <View style={style.pastState}>
              <State state={item.status} />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export { WFHRequest };
