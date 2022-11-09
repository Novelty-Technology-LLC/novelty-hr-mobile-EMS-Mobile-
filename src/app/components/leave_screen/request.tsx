import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { requestStyle as style } from "../../../assets/styles";
import RequestWithImage from "./requestWithImage";
import State from "./state";

import getDay from "../../utils/getDay";
import { ApproveDeny } from "./approveDeny";
import { AdminRequestContext, AuthContext } from "../../reducer";
import { getLeaveOption } from "../../utils/getLeaveType";

interface requestPropType {
  item: any;
  other?: boolean;
  recieved?: boolean;
  onPress?: Function;
}

const Request = ({ item, other, recieved, onPress }: requestPropType) => {
  let { day } = getDay(item);
  const [isReplied, setIsReplied] = useState(false);
  const { state } = useContext(AuthContext);
  const { adminrequests } = useContext(AdminRequestContext);

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
  const leave_option = getLeaveOption(item?.leave_option);

  return (
    <>
      {!other ? (
        <TouchableOpacity
          style={style.container}
          onPress={() => onPress && !other && onPress()}
        >
          <View style={style.dateView}>
            <View style={style.status}>
              <Text style={style.date}>{item.date}</Text>
              <View style={style.stateView}>
                <State state={item.state} />
              </View>
            </View>
            <Text style={style.type}>
              <Text> {item.type}</Text>
              {leave_option !== "FULL DAY" && (
                <Text> {` (${leave_option})`}</Text>
              )}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={style.container}>
          <RequestWithImage item={item} onPress={onPress} />
          {recieved ? (
            <View style={style.subcontainer}>
              <Text style={style.days}>
                {day > 1 ? day + " days ago" : (day = " Today")}
              </Text>
              <View style={style.status}>
                <State state={item.state} />
              </View>
              {!isReplied && (
                <View style={style.buttonContainer}>
                  <ApproveDeny
                    title="Approve"
                    style={style}
                    item={item}
                    fromStack={true}
                  />
                  <View style={style.buttonSpacer}></View>
                  <ApproveDeny
                    title="Deny"
                    style={style}
                    item={item}
                    fromStack={true}
                  />
                </View>
              )}
            </View>
          ) : (
            <View style={style.pastState}>
              <State state={item.state} />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export { Request };
